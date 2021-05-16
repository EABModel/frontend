import { modalActions } from '../slices/modalSlice';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const showPopUpInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(modalActions.showLogIn());
  };
};

export const closePopUpInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(modalActions.closeLogIn());
  };
};
