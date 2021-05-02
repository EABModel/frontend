import authServices from '../../services/authServices';
import { authActions } from '../slices/authSlice';
import { userActions } from '../slices/userSlice';
import { buildAuthInteractor, buildInteractorNoParams } from './base';

export const postAuthInteractor = buildAuthInteractor(
  authActions.loadingPostAuth,
  authActions.successPostAuth,
  authActions.errorPostAuth,
  userActions.successAddUser,
  userActions.errorAddUser,
  authServices.postAuth,
);

export const logoutAuthInteractor = buildInteractorNoParams(
  authActions.loadingLogoutAuth,
  authActions.successLogoutAuth,
  authActions.errorLogoutAuth,
  null,
);
