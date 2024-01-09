import { configureStore } from "@reduxjs/toolkit";
import shipmentsReducer from "./features/shipmentsSlice";

const store = configureStore({
  reducer: {
    shipments: shipmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
