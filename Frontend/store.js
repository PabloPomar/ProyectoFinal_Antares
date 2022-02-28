import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import productReducer from "./slices/productSlice";
import navOptionsReducer from "./slices/navOptionsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
    navOptions: navOptionsReducer,
  },
});
