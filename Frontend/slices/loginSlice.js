import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
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
  },
});

export const { setUserData } = loginSlice.actions;

// Selectors
export const selectUserData = (state) => state.login;

export default loginSlice.reducer;