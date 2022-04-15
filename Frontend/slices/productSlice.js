import { createSlice } from "@reduxjs/toolkit";
import { productsInfo } from "./mockedProducts/data";

// pasamos el estado inicial de la app
const initialState = {
  selectedProducts: {},
  selectedType: "Pizzas",
  productTypes: ["Cervezas", "Hamburguesas", "Pizzas"],
  productIds: [
    "kolsch1",
    "scotch1",
    "porter1",
    "barleywine1",
    "parma1",
    "capri1",
    "americana1",
  ],
  productList: productsInfo,
  order: {}, // aca se cargan los ids de los productos y sus cantidades.
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeProductQuantity: (state, action) => {
      state.productList[action.payload.id].quantity = action.payload.quantity;
    },
    addToRemoveFromSelection: (state, action) => {
      if (state.selectedProducts[action.payload.id]) {
        if (action.payload.quantity == 0) {
          delete state.selectedProducts[action.payload.id];
        } else {
          state.selectedProducts[action.payload.id] = action.payload.quantity;
        }
      } else {
        state.selectedProducts[action.payload.id] = action.payload.quantity;
      }
    },
    createOrder: (state, _action) => {
      state.order = state.selectedProducts;
    },
    changeType: (state, action) => {
      state.selectedType = action.payload.type;
    }
  },
});

// Actions
export const { changeProductQuantity, addToRemoveFromSelection, createOrder, changeType } =
  productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products; // will be deprecated
export const selectProductsByType = (state, type) => {
  return Object.values(state.products.productList).filter((o) => {
    return o.type == type;
  });
};
export const selectType = (state) => state.products.selectedType;
export const selectProductSelection = (state) =>
  state.products.selectedProducts;
export const selectOrder = (state) => state.products.order;

export default productSlice.reducer;
