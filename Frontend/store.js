import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
  },
});
