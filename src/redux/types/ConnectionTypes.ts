import firebase from 'firebase/app';

export interface ConnectionState {
  firestore: firebase.firestore.Firestore;
  peerConnection: RTCPeerConnection;
  localStream: any;
  remoteStream: any;
  hangup: boolean;
}

// export interface CallState {
//   id: string;
//   employeeId: string;
//   shopId: string;
//   rating: string;
//   date: Date;
// }

export interface CallPostFields {
  employeeId: string;
  shopId: string;
  date: Date;
}
