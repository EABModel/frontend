import firebase from 'firebase/app';

export interface ConnectionState {
  firestore: firebase.firestore.Firestore;
  peerConnection: RTCPeerConnection;
  localStream: any;
  remoteStream: any;
  hangup: boolean;
}

export interface CallPostFields {
  employeeId: string;
  shopId: string;
  rating: number | null;
  date: Date;
}
