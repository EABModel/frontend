// User state, actions and other user related stuff
export interface UserState {
  user: {
    username: string,
    userId: string,
    sessionType: Session,
    authToken: string,
    refreshToken: string
  }
};

export type UserAction = {
  type: UserActionTypes;
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

// If you want to add a new state for the store, add it here