import { UserState, Session } from '../types/UserTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  username: 'defaultUser',
  email: '',
  userId: '',
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingLoginUser: (state: UserState) => {
      return {
        ...state,
        loginUserStatus: { loading: true, success: false, error: false },
      };
    },
    successLoginUser: (state: UserState, action) => {
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
    },
    errorLoginUser: (state: UserState, action) => {
      return {
        ...state,
        loginUserStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingLogoutUser: (state: UserState) => {
      return {
        ...state,
        logoutUserStatus: { loading: true, success: false, error: false },
      };
    },
    successLogoutUser: (state: UserState) => {
      return {
        ...state,
        ...initialState,
        logoutUserStatus: { loading: false, success: true, error: false },
      };
    },
    errorLogoutUser: (state: UserState, action) => {
      return {
        ...state,
        logoutUserStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
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
