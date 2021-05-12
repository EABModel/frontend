import { userActions } from '../slices/userSlice';
import userServices from '../../services/userServices';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
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
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(userActions.resetUserStatus());
  };
};

export const resetUserInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(userActions.resetUser());
  };
};
