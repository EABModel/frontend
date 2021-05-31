import { companyActions } from '../slices/companySlice';
import companyServices from '../../services/companyServices';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { buildInteractor, buildInteractorNoParams } from './base';

export const registerCompanyInteractor = buildInteractor(
  companyActions.loadingRegisterCompany,
  companyActions.successRegisterCompany,
  companyActions.errorRegisterCompany,
  companyServices.postCompanyRegister,
);

export const loginCompanyInteractor = buildInteractor(
  companyActions.loadingLoginCompany,
  companyActions.successLoginCompany,
  companyActions.errorLoginCompany,
  companyServices.postCompanyLogin,
);

export const logoutCompanyInteractor = buildInteractorNoParams(
  companyActions.loadingLogoutCompany,
  companyActions.successLogoutCompany,
  companyActions.errorLogoutCompany,
  null,
);

export const resetCompanyStatusInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(companyActions.resetCompanyStatus());
  };
};

export const resetCompanyInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(companyActions.resetCompany());
  };
};