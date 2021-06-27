import { CompanyState } from '../types/CompanyTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Action, baseRequestStatusReducers } from './base';

const initialState: CompanyState = {
  id: '',
  name: '',
  email: '',
  shops: [],
  registerCompanyStatus: {
    loading: false,
    success: false,
    error: false,
  },
  loginCompanyStatus: {
    loading: false,
    success: false,
    error: false,
  },
  logoutCompanyStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const successRegisterCompany = (state: CompanyState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    registerCompanyStatus: { loading: false, success: true, error: false },
  };
};

const successLoginCompany = (state: CompanyState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    loginCompanyStatus: { loading: false, success: true, error: false },
  };
};

const successLogoutCompany = (state: CompanyState) => {
  return {
    ...state,
    ...initialState,
    logoutCompanyStatus: { loading: false, success: true, error: false },
  };
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    ...baseRequestStatusReducers('registerCompany', initialState, null, successRegisterCompany),
    ...baseRequestStatusReducers('loginCompany', initialState, null, successLoginCompany),
    ...baseRequestStatusReducers('logoutCompany', initialState, null, successLogoutCompany),
    resetCompanyStatus: (state: CompanyState) => {
      return {
        ...state,
        loginCompanyStatus: initialState.loginCompanyStatus,
        logoutCompanyStatus: initialState.logoutCompanyStatus,
      };
    },
    resetCompany: (state: CompanyState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const companyReducer = companySlice.reducer;
export const companyActions = companySlice.actions;
