import { userActions } from '../slices/userSlice';
import usersService from '../../services/userServices';
import { buildInteractor } from './base';

export const getUserInteractor = buildInteractor(
  userActions.loadingAddUser,
  userActions.successAddUser,
  userActions.errorAddUser,
  usersService.getUser,
);

export const removeSuccessStatusInteractor = () => {
  return (dispatch: any) => {
    dispatch(userActions.removeSuccessStatus());
  }
};

export const logoutUserInteractor = () => {
  return (dispatch: any) => {
    dispatch(userActions.logoutUser());
  }
};
