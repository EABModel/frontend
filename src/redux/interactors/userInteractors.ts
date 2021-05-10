import { userActions } from '../slices/userSlice';
import userServices from '../../services/userServices';
import { buildInteractor, buildInteractorNoParams } from './base';

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

export const resetUserStatusInteractor = () => {
  return (dispatch: any) => {
    dispatch(userActions.resetUserStatus());
  }
};

export const resetUserInteractor = () => {
  return (dispatch: any) => {
    dispatch(userActions.resetUser());
  }
};
