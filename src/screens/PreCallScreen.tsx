import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { ConnectionState } from '../redux/types/ConnectionTypes';
import '../styles/css/calls.scss';

interface StateProps {
  connection: ConnectionState;
  shopId: string;
}

interface Props extends StateProps {
  // extra props you want to add
}

const CustomerVideoChat: FC<Props> = (props: Props) => {
  const history = useHistory();
  const { firestore } = props.connection;
  const [callId, setCallId] = useState<any>(null);
  const [surveyShowing, setSurveyShowing] = useState(false);

  const showSurvey = () => {
    // Show survey
    setSurveyShowing(true);
  };

  const sendSurvey = () => {
    // Send survey
    setCallId(null);
    setSurveyShowing(false); // Stop showing survey
    history.go(-1); // Go back to previous page
  };

  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    firestore.collection('shopCalls').doc(props.shopId).set({ updatedAt: new Date() });
    const status = {
      answered: false,
      inProgress: false,
      date: new Date(),
    };
    // Aqui de puede crear una llamada en backend y darle el id que retorne a el .doc(id_retornado) usando .then()
    // Luego se setea el id de la llamada con setCallId(id_retornado)
    firestore.collection('shopCalls').doc(props.shopId).collection('calls').doc().set({ status });
  }, []);

  // Listen to any additions or deletions to the database
  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    const unsubscribe = firestore
      .collection('shopCalls')
      .doc(props.shopId)
      .collection('calls')
      .onSnapshot((snapshot) => {
        // If call is finished display survey
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed' && !change.doc.id === callId) {
            showSurvey();
          }
        });
      });
    return () => {
      unsubscribe();
    };
  }, [firestore]);

  if (surveyShowing) {
    return <div>Survey Component</div>;
  }

  return (
    <div className="go-to-tablet-screen">
      <h1>An assistant will take care of you</h1>
      <p>Please, go to the nearest assistance tablet 😁</p>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
    shopId: state.shop.id,
  };
};

export default connect(mapStateToProps)(CustomerVideoChat);