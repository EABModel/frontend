import { userActions } from '../reducers/UserReducer';
import { Session, UserAuthFields } from '../types/UserTypes';

export const fetchUserInteractor = (authFields: UserAuthFields) => {
  return function (dispatch: any) {
    dispatch(userActions.loadingAddUser());
    // Simulate API call
    setTimeout(() => {
      const user = {
        username: authFields.usernameOrEmail,
        email: authFields.usernameOrEmail,
        userId: 'hfyr-7hd7-d73h-df44',
        sessionType: Session.EMPLOYEE,
        authToken: 'myAuthToken',
        refreshToken: 'myRefreshToken',
      };
      dispatch(userActions.successAddUser(user));
    }, 1000);
  };
};

export const logoutUserInteractor = () => {
  return function (dispatch: any) {
    dispatch(userActions.loadingLogoutUser());
    // Simulate API call
    setTimeout(() => {
      dispatch(userActions.successLogoutUser());
    }, 500);
  };
};
