import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  0: {
    id: 0,
    name: "Visa",
    type: "font-awesome",
    icon: "cc-visa",
    desc: "terminada en **** 2243",
    selected: false,
  },
  1: {
    id: 1,
    name: "MasterCard",
    type: "font-awesome",
    icon: "cc-mastercard",
    desc: "terminada en **** 4576",
    selected: false,
  },
  2: {
    id: 2,
    name: "Amex",
    type: "font-awesome",
    icon: "cc-amex",
    desc: "terminada en **** 9712",
    selected: false,
  },
};

export const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    selectCard: (state, action) => {
      state[action.payload.id].selected = true;
      for (let index = 0; index < Object.keys(state).length; index++) {
        if (index != action.payload.id) {
          state[index].selected = false;
        }
      }
    },
    removeSelection: (state, _action) => {
      let selectedKey = Object.keys(state).filter(
        (key) => state[key].selected == true
      );
      state[selectedKey].selected = false
    },
  },
});

export const { selectCard, removeSelection } = paymentMethodsSlice.actions;

// Selectors
export const selectPaymentMethods = (state) => state.paymentMethods;
export const getSelectedPaymentMethod = (state) => {
  return Object.keys(state.paymentMethods).filter(
    (key) => state.paymentMethods[key].selected == true
  );
};

export default paymentMethodsSlice.reducer;
