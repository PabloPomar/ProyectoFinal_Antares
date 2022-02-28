import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  0: {
    id: 0,
    name: "HomeScreen",
    type: "antdesign",
    icon: "home",
    selected: true,
  },
  1: {
    id: 1,
    name: "MenuScreen",
    type: "font-awesome-5",
    icon: "beer",
    selected: false,
  },
  2: {
    id: 2,
    name: "OrderScreen",
    type: "entypo",
    icon: "text-document",
    selected: false,
  },
};

export const navOptionSlice = createSlice({
  name: "navOptions",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state[action.payload.id].selected = true;
      for (let index = 0; index < Object.keys(state).length; index++) {
        if (index != action.payload.id) {
          state[index].selected = false;
        }
      }
    },
  },
});

export const { setSelected } = navOptionSlice.actions;

// Selectors
export const selectNavOptions = (state) => state.navOptions;

export default navOptionSlice.reducer;
