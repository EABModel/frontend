import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectionState } from '../../redux/types/ConnectionTypes';
import setSources from '../../utils/videoHelpers/setMediaSources';
import * as connectionInteractors from '../../redux/interactors/connectionInteractors';

interface StateProps {
  connection: ConnectionState;
  shopId: string;
}

interface DispatchProps {
  setLocalStreamInteractor: typeof connectionInteractors.setLocalStreamInteractor;
  setRemoteStreamInteractor: typeof connectionInteractors.setRemoteStreamInteractor;
  resetStreamConnectionInteractor: typeof connectionInteractors.resetStreamConnectionInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const CustomerVideoChat: FC<Props> = (props: Props) => {
  const { firestore, peerConnection } = props.connection;
  const history = useHistory();
  const webcamVideo = useRef<any>();
  const remoteVideo = useRef<any>();
  const callInput = useRef<string>();
  const [isOnCall, setIsOnCall] = useState(false);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    firestore.collection('shopCalls').doc(props.shopId).set({ updatedAt: new Date() });
    const data = {
      peerConnection,
      webcamVideo: webcamVideo.current,
      remoteVideo: remoteVideo.current,
    };
    setSources(data).then(({ localStream, remoteStream }) => {
      props.setLocalStreamInteractor(localStream);
      props.setRemoteStreamInteractor(remoteStream);
    });
    // Cleanup
    return () => {
      if (webcamVideo.current && remoteVideo.current) {
        webcamVideo.current.srcObject = null;
        remoteVideo.current.srcObject = null;
      }
      props.resetStreamConnectionInteractor();
    };
  }, []);

  const startCall = async () => {
    // Create document with two sub collections in the current shop with shopId
    const callsDocument = firestore.collection('shopCalls').doc(props.shopId).collection('calls').doc();
    const offerCandidates = callsDocument?.collection('offerCandidates');
    const answerCandidates = callsDocument?.collection('answerCandidates');
    callInput.current = callsDocument.id;
    setCalling(true);
    setIsOnCall(true);

    // Get candidates for caller, save to db
    peerConnection.onicecandidate = (event: any) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create call offer with offer and status
    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    const status = {
      answered: false,
      date: new Date(),
    };
    await callsDocument.set({ offer, status });

    // Listen for remote answer
    callsDocument.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
          setCalling(false);
        }
      });
    });
  };

  const hangupCall = useCallback(async () => {
    setIsOnCall(false);
    try {
      // Deleting collections is not recommended from web client, find alternative later
      await firestore.collection('shopCalls').doc(props.shopId).collection('calls').doc(callInput.current).delete();
    } catch (error) {
      console.log(error);
    } finally {
      history.go(-1);
    }
  }, []);

  return (
    <>
      <div className="customer-main-container">
        <video className="local-video-container" ref={webcamVideo} autoPlay playsInline></video>
        <video className="remote-video-container" ref={remoteVideo} autoPlay playsInline></video>
        <div className="customer-button-container">
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained">
            <Button size="small" variant="contained" color="primary" disabled={isOnCall} onClick={startCall}>
              Call Assistant
            </Button>
            <Button size="small" variant="contained" color="secondary" disabled={!isOnCall} onClick={hangupCall}>
              Hangup
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {calling && <LinearProgress />}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
    shopId: state.shop.id,
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerVideoChat);
