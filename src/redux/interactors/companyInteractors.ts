// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck projectActions properties generated at runtime
import { companyActions } from '../slices/companySlice';
import companyServices from '../../services/companyServices';
import { buildInteractor, buildInteractorNoParams, buildInteractorDirectActionNoParams } from './base';

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

export const resetRegisterCompanyInteractor = buildInteractorDirectActionNoParams(companyActions.resetRegisterCompany);

export const resetLoginCompanyInteractor = buildInteractorDirectActionNoParams(companyActions.resetLoginCompany);

export const resetLogoutCompanyInteractor = buildInteractorDirectActionNoParams(companyActions.resetLogoutCompany);

export const resetCompanyStatusInteractor = buildInteractorDirectActionNoParams(companyActions.resetCompanyStatus);

export const resetCompanyInteractor = buildInteractorDirectActionNoParams(companyActions.resetCompany);
