import { CompanyState } from '../types/CompanyTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CompanyState = {
  id: '',
  name: '',
  shops: [],
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

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    loadingLoginCompany: (state: CompanyState) => {
      return {
        ...state,
        loginCompanyStatus: { loading: true, success: false, error: false },
      };
    },
    successLoginCompany: (state: CompanyState, action) => {
      return {
        ...state,
        ...action.payload,
        loginCompanyStatus: { loading: false, success: true, error: false },
      };
    },
    errorLoginCompany: (state: CompanyState, action) => {
      return {
        ...state,
        loginCompanyStatus: { loading: false, success: false, error: action.payload || true },
      };
    },
    loadingLogoutCompany: (state: CompanyState) => {
      return {
        ...state,
        logoutCompanyStatus: { loading: true, success: false, error: false },
      };
    },
    successLogoutCompany: (state: CompanyState) => {
      return {
        ...state,
        ...initialState,
        logoutCompanyStatus: { loading: false, success: true, error: false },
      };
    },
    errorLogoutCompany: (state: CompanyState, action) => {
      return {
        ...state,
        logoutCompanyStatus: { loading: false, success: false, error: action.payload || true },
      };
    },
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
