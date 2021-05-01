import { UserState } from '../types/UserTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  username: 'defaultUser',
  email: '',
  userId: '',
  addUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const userSlice = createSlice({
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
    removeSuccessStatus: (state: UserState) => {
      return {
        ...state,
        addUserStatus: {
          loading: false,
          success: false,
          error: false,
        },
      };
    },
    logoutUser: (state: UserState) => {
      return {
        ...state,
        ...initialState
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
