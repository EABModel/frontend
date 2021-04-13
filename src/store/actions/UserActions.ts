import { UserActionTypes, UserState, UserAction } from '../types';


export const addUser = (user: UserState): UserAction => ({
  type: UserActionTypes.ADD_USER,
  payload: user,
});

export const removeUser = (): UserAction => ({
  type: UserActionTypes.REMOVE_USER,
});