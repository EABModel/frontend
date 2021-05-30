export interface UserState {
  id: string;
  username: string;
  email: string;
  sessionType: Session;
  loginUserStatus: {
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

export interface PostUserFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserAuthFields {
  email: string;
  password: string;
}

export enum Session {
  ANONYMOUS = 'ANONYMOUS',
  EMPLOYEE = 'EMPLOYEE',
  ADMINISTRATOR = 'ADMINISTRATOR',
}
