import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trading_capital: 0,
  trading_capital_currency: "",
  balance: 0,
  on_hold: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
