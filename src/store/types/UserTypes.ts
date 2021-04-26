export interface UserState {
  username: string;
  email: string;
  userId: string;
  sessionType: Session;
  authToken: string;
  refreshToken: string;
  addUserStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  logoutUserStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

export interface UserAuthFields {
  usernameOrEmail: string;
  password: string;
}


export type UserAction = {
  type: UserActionTypes,
  payload?: UserState
};

export enum Session {
  ANONYMOUS = 'ANONYMOUS',
  EMPLOYEE = 'EMPLOYEE',
  ADMINISTRATOR = 'ADMINISTRATOR'
};

export enum UserActionTypes {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
};
