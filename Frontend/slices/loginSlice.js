import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  loggedIn: false,
  token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.token = action.payload.token;
    },
    logout: (state, _action) => {
      state.loggedIn = false;
      state.token = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;

// Selectors
export const selectLoginStatus = (state) => state.login.loggedIn;
export const selectToken = (state) => state.login.token;

export default loginSlice.reducer;
