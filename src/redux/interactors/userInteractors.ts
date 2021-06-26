// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck projectActions properties generated at runtime
import { userActions } from '../slices/userSlice';
import userServices from '../../services/userServices';
import { buildInteractor, buildInteractorNoParams, buildInteractorDirectActionNoParams } from './base';

export const loginUserInteractor = buildInteractor(
  userActions.loadingLoginUser,
  userActions.successLoginUser,
  userActions.errorLoginUser,
  userServices.postUserLogin,
);

export const logoutUserInteractor = buildInteractorNoParams(
  userActions.loadingLogoutUser,
  userActions.successLogoutUser,
  userActions.errorLogoutUser,
  null,
);

export const resetUserStatusInteractor = buildInteractorDirectActionNoParams(userActions.resetUserStatus);

export const resetUserInteractor = buildInteractorDirectActionNoParams(userActions.resetUser);
