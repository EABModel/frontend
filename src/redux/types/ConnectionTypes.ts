import firebase from 'firebase/app';

export interface ConnectionState {
  firestore: firebase.firestore.Firestore;
  peerConnection: RTCPeerConnection;
  localStream: any;
  remoteStream: any;
}
