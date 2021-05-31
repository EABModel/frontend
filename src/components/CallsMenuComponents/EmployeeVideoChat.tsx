import React, { FC, useEffect, useRef, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectionState } from '../../redux/types/ConnectionTypes';
import setSources from '../../utils/videoHelpers/setMediaSources';
import * as connectionInteractors from '../../redux/interactors/connectionInteractors';

interface StateProps {
  connection: ConnectionState;
}

interface DispatchProps {
  setLocalStreamInteractor: typeof connectionInteractors.setLocalStreamInteractor;
  setRemoteStreamInteractor: typeof connectionInteractors.setRemoteStreamInteractor;
  resetStreamConnectionInteractor: typeof connectionInteractors.resetStreamConnectionInteractor;
}

interface Props extends StateProps, DispatchProps {
  callId: string;
  setOnCall: any;
  shopId: string;
}

const EmployeeVideoChat: FC<Props> = (props: Props) => {
  const { callId, shopId } = props;
  const { firestore, peerConnection } = props.connection;
  const webcamVideo = useRef<any>();
  const remoteVideo = useRef<any>();

  useEffect(() => {
    const data = {
      peerConnection,
      webcamVideo: webcamVideo.current,
      remoteVideo: remoteVideo.current,
    };
    if (!props.connection.localStream || !props.connection.remoteStream) {
      setSources(data).then(({ localStream, remoteStream }) => {
        props.setLocalStreamInteractor(localStream);
        props.setRemoteStreamInteractor(remoteStream);
      });
    }
    answerCall();
    // Cleanup
    return () => {
      hangupCall();
      if (webcamVideo.current && remoteVideo.current) {
        webcamVideo.current.srcObject = null;
        remoteVideo.current.srcObject = null;
      }
      props.resetStreamConnectionInteractor();
    };
  }, []);

  const answerCall = useCallback(async () => {
    const callDocument = firestore.collection('shopCalls').doc(shopId).collection('calls').doc(callId);
    const answerCandidates = callDocument.collection('answerCandidates');
    const offerCandidates = callDocument.collection('offerCandidates');

    peerConnection.onicecandidate = (event: any) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };
    const callData = (await callDocument.get()).data();

    const offerDescription = callData?.offer;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    await callDocument.update({ answer, 'status.answered': true });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }, []);

  const hangupCall = useCallback(async () => {
    try {
      console.log('This it a test console log to prevent firestore excessive requests...');
      await firestore.collection('shopCalls').doc(props.shopId).collection('calls').doc(callId).delete();
    } catch (error) {
      console.log(error);
    } finally {
      props.setOnCall(null);
    }
  }, []);

  return (
    <div className="employee-main-container">
      <video className="employee-local-video-container" ref={webcamVideo} autoPlay playsInline></video>
      <video className="employee-remote-video-container" ref={remoteVideo} autoPlay playsInline></video>
      <div className="employee-button-container">
        <Button variant="contained" color="secondary" onClick={hangupCall}>
          Hangup
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...connectionInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeVideoChat);
