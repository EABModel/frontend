import { companyActions } from '../slices/companySlice';
import companyServices from '../../services/companyServices';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { buildInteractor, buildInteractorNoParams } from './base';

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

export const resetShopStatusInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(companyActions.resetCompanyStatus());
  };
};

export const resetShopInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(companyActions.resetCompany());
  };
};
