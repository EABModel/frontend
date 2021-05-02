export interface UserState {
  username: string;
  email: string;
  userId: string;
  addUserStatus: {
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
