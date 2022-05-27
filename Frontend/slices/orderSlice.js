import { createSlice } from "@reduxjs/toolkit";

const idToStatus = {
  1: "Pagado",
  2: "Preparando",
  3: "EnCamino",
  4: "Entregado",
  5: "Finalizado",
};

const initialState = {
  paid: false, // poner en false
  status: "Pagado",
  orderId: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    generateOrder: (state, action) => {
      state.paid = action.payload.paid;
      state.status = idToStatus[1]; // se inicializa en 1 como pagado
      state.orderId = action.payload.id;
    },
    updateOrderStatus: (state, action) => {
      state.status = idToStatus[action.payload.status];
    },
  },
});

export const { generateOrder, updateOrderStatus } = orderSlice.actions;

// Selectors
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderPaid = (state) => state.order.paid;
export const selectOrderId = (state) => state.order.orderId;

export default orderSlice.reducer;
