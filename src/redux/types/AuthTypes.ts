export interface AuthState {
  sessionType: Session;
  authToken: string;
  refreshToken: string;
  postAuthStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  logoutAuthStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

export interface PostAuthFields {
  email: string;
  password: string;
}

export enum Session {
  ANONYMOUS = 'ANONYMOUS',
  EMPLOYEE = 'EMPLOYEE',
  ADMINISTRATOR = 'ADMINISTRATOR'
}
