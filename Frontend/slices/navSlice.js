import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  data: null, 
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = navSlice.actions;

// Selectors
export const selectData = (state) => state.nav.data;

export default navSlice.reducer;
