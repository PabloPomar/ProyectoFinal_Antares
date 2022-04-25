import { createSlice } from "@reduxjs/toolkit";

export const statusColors = {
  "Preparando": "red",
  "En Camino": "yellow",
  "Entregado": "green"
}

const initialState = {
  paid: false,
  status: ""
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    generateOrder: (state, action) => {
      state.paid = action.payload.paid
      state.status = action.payload.status
    },
    updateOrderStatus: (state, action) => {
      state.status = action.payload.status
    }
  },
});

export const { generateOrder, updateOrderStatus } = orderSlice.actions;

// Selectors
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderPaid = (state) => state.order.paid;

export default orderSlice.reducer;
