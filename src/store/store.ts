import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@store/api/api.ts";
import { balanceSlice } from "@store/balance/slice/balance.slice.ts";
import { botsSlice } from "@store/bots/slice/bots.slice.ts";
import { periodSlice } from "@store/period/slice/period.slice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    balance: balanceSlice.reducer,
    bots: botsSlice.reducer,
    period: periodSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
