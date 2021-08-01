import { createSlice } from '@reduxjs/toolkit';

interface AuthenticationReducerInterface {
  isAuth: boolean;
}

const initialState: AuthenticationReducerInterface = {
  isAuth: false,
};

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
    },
    login: (state) => {
      state.isAuth = true;
    },
  },
});

export const { logout, login } = authenticationSlice.actions;

export default authenticationSlice.reducer;
