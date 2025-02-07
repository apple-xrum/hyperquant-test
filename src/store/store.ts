import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@store/api/api.ts";
import balanceReducer from "@store/balance/slice/balance.slice.ts";
import botsReducer from "@store/bots/slice/bots.slice.ts";
import periodReducer from "@store/period/slice/period.slice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    balance: balanceReducer,
    bots: botsReducer,
    period: periodReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
