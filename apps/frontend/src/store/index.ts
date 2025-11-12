import { configureStore } from "@reduxjs/toolkit";
import { pricingApi } from "./api/pricingApi";

export const store = configureStore({
  reducer: {
    [pricingApi.reducerPath]: pricingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pricingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
