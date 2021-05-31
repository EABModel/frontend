import { createSlice } from '@reduxjs/toolkit';
import { ConnectionState } from '../types/ConnectionTypes';
import firestore from '../../services/firebase/config';
import peerConnection from '../../services/webRTC/config';

const initialState: ConnectionState = {
  firestore,
  peerConnection,
  localStream: null,
  remoteStream: null,
};

const connection = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    addLocalStream: (state: ConnectionState, action) => {
      return {
        ...state,
        localStream: action.payload,
      };
    },
    removeLocalStream: (state: ConnectionState) => {
      return {
        ...state,
        localStream: initialState.localStream,
      };
    },
    addRemoteStream: (state: ConnectionState, action) => {
      return {
        ...state,
        remoteStream: action.payload,
      };
    },
    removeRemoteStream: (state: ConnectionState) => {
      return {
        ...state,
        remoteStream: initialState.remoteStream,
      };
    },
    resetStreamConnection: (state: ConnectionState) => {
      return {
        ...state,
        peerConnection: initialState.peerConnection,
        localStream: initialState.localStream,
        remoteStream: initialState.remoteStream,
      };
    },
  },
});

export const connectionReducer = connection.reducer;
export const connectionActions = connection.actions;
