import { AuthState, Session } from '../types/AuthTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  sessionType: Session.ANONYMOUS,
  authToken: '',
  refreshToken: '',
  postAuthStatus: {
    loading: false,
    success: false,
    error: false,
  },
  logoutAuthStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingPostAuth: (state: AuthState) => {
      return {
        ...state,
        postAuthStatus: { loading: true, success: false, error: false },
      };
    },
    successPostAuth: (state: AuthState, action) => {
      return {
        ...state,
        ...action.payload,
        postAuthStatus: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorPostAuth: (state: AuthState, action) => {
      return {
        ...state,
        postAuthStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingLogoutAuth: (state: AuthState) => {
      return {
        ...state,
        logoutAuthStatus: { loading: true, success: false, error: false },
      };
    },
    successLogoutAuth: (state: AuthState, _action) => {
      return {
        ...state,
        ...initialState,
        logoutAuthStatus: { loading: false, success: true, error: false },
      };
    },
    errorLogoutAuth: (state: AuthState, action) => {
      return {
        ...state,
        logoutUserStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
