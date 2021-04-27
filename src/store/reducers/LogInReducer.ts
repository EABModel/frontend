import { createSlice } from '@reduxjs/toolkit';
import { PopUpState } from '../types/LogInTypes';

const initialState: PopUpState = {
  open: false,
};

const logIn = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    showLogIn: (state: PopUpState) => {
      return {
        ...state,
        open: true,
      };
    },
  },
});

export default logIn.reducer;
export const logInActions = logIn.actions;