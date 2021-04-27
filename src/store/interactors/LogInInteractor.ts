import { logInActions } from '../reducers/LogInReducer';

export const showPopUpInteractor = () => {
    return function (dispatch: any) {
      dispatch(logInActions.showLogIn());
    };
  };