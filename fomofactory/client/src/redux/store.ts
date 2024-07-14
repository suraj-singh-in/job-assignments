import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./features/coin-slice";

export const store = configureStore({
  reducer: {
    coinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
