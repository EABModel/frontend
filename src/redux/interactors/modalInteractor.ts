import { logInActions } from '../slices/modalSlice';

export const showPopUpInteractor = () => {
  return function (dispatch: any) {
    dispatch(logInActions.showLogIn());
  };
};

export const closePopUpInteractor = () => {
  return function (dispatch: any) {
    dispatch(logInActions.closeLogIn());
  };
};
