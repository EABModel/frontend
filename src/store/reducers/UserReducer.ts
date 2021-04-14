import { Session, UserState, UserAction } from '../types/UserTypes';


const initialState = {
  username: 'Customer',
  userId: '',
  sessionType: Session.ANONYMOUS,
  authToken: '',
  refreshToken: ''
};

export const userReducer = (state: UserState['user'] = initialState, action: UserAction) => {
  switch(action.type) {
    case 'ADD_USER': 
      return state;
    case 'REMOVE_USER':
      return initialState;
    default:
      return initialState;
  }
};