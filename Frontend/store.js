import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import productReducer from "./slices/productSlice";
import navOptionsReducer from "./slices/navOptionsSlice";
import paymentMethodsReducer from "./slices/paymentMethodsSlice";
import { usuarioApi } from "./services/usuario";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    [usuarioApi.reducerPath]: usuarioApi.reducer,
    products: productReducer,
    paymentMethods: paymentMethodsReducer,
    navOptions: navOptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(usuarioApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
