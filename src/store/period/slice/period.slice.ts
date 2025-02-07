import { createSlice } from "@reduxjs/toolkit";

type PeriodType = "24h" | "7d" | "30d" | "60d" | "90d" | "all_time";

const initialState: {
  currentPeriod: PeriodType;
} = {
  currentPeriod: (localStorage.getItem("currentPeriod") as PeriodType) || "all_time",
};

export const periodSlice = createSlice({
  name: "period",
  initialState,
  reducers: {
    setCurrentPeriod: (state, action) => {
      state.currentPeriod = action.payload;
      localStorage.setItem("currentPeriod", state.currentPeriod);
    },
  },
});

export const { setCurrentPeriod } = periodSlice.actions;
export default periodSlice.reducer;
