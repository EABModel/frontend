import { UserState, Session } from '../types/UserTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  username: 'defaultUser',
  email: '',
  userId: '',
  sessionType: Session.ANONYMOUS,
  authToken: '',
  refreshToken: '',
  addUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
  logoutUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingAddUser: (state: UserState) => {
      return {
        ...state,
        addUserStatus: { loading: true, success: false, error: false },
      };
    },
    successAddUser: (state: UserState, action) => {
      return {
        ...state,
        ...action.payload,
        addUserStatus: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorAddUser: (state: UserState, action) => {
      return {
        ...state,
        addUserStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingLogoutUser: (state: UserState) => {
      return {
        ...state,
        ...initialState,
        logoutUserStatus: { loading: true, success: false, error: false },
      };
    },
    successLogoutUser: (state: UserState) => {
      return {
        ...state,
        logoutUserStatus: { loading: false, success: true, error: false },
      };
    },
    errorLogoutUser: (state: UserState) => {
      return {
        ...state,
        logoutUserStatus: { loading: false, success: false, error: true },
      };
    },
  },
});

export default user.reducer;
export const userActions = user.actions;
