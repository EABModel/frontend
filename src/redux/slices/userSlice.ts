import { UserState, Session } from '../types/UserTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Action, baseRequestStatusReducers } from './base';

const initialState: UserState = {
  username: 'defaultUser',
  email: '',
  id: '',
  sessionType: Session.ANONYMOUS,
  loginUserStatus: {
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

const successLoginUser = (state: UserState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    loginUserStatus: {
      loading: false,
      success: true,
      error: false,
    },
    logoutUserStatus: { loading: false, success: false, error: false },
  };
};

const successLogoutUser = (state: UserState) => {
  return {
    ...state,
    ...initialState,
    logoutUserStatus: { loading: false, success: true, error: false },
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ...baseRequestStatusReducers('loginUser', initialState, null, successLoginUser),
    ...baseRequestStatusReducers('logoutUser', initialState, null, successLogoutUser),
    resetUserStatus: (state: UserState) => {
      return {
        ...state,
        loginUserStatus: initialState.loginUserStatus,
        logoutUserStatus: initialState.logoutUserStatus,
      };
    },
    resetUser: (state: UserState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
