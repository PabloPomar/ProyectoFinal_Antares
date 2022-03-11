import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  0: {
    id: 0,
    name: "Visa",
    type: "font-awesome",
    icon: "cc-visa",
    selected: true,
  },
  1: {
    id: 1,
    name: "MasterCard",
    type: "font-awesome",
    icon: "cc-mastercard",
    selected: true,
  },
  2: {
    id: 2,
    name: "Amex",
    type: "font-awesome",
    icon: "cc-amex",
    selected: true,
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
  },
});

export const { selectCard } = paymentMethodsSlice.actions;

// Selectors
export const selectPaymentMethods = (state) => state.paymentMethods;

export default paymentMethodsSlice.reducer;
