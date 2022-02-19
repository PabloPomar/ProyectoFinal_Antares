import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  loggedIn: true,
  user: "pepito",
  email: "pepito@gmail.com",
  pwd: "123",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.email = action.payload.email;
      state.pwd = action.payload.pwd;
    },
    logInOut: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export const { setUserData, logInOut } = loginSlice.actions;

// Selectors
export const selectUserData = (state) => state.login;
export const selectLoginStatus = (state) => state.login.loggedIn;

export default loginSlice.reducer;
