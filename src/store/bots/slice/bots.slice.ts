import { createSlice } from "@reduxjs/toolkit";
import { BotType } from "@types";

const initialState: {
  bots: BotType[];
  currentBot: BotType | null;
} = {
  bots: [],
  currentBot: JSON.parse(<string>localStorage.getItem("currentBot")) || null,
};

export const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    setBots: (state, action) => {
      state.bots = action.payload;
      if (!state.currentBot && state.bots.length > 0) {
        state.currentBot = state.bots[0];
        localStorage.setItem("currentBot", JSON.stringify(state.currentBot));
      }
    },
    setCurrentBot: (state, action) => {
      const botName = action.payload;
      state.currentBot = state.bots.find((bot) => bot.name === botName)!;
      localStorage.setItem("currentBot", JSON.stringify(state.currentBot));
    },
  },
});

export const { setBots, setCurrentBot } = botsSlice.actions;
export default botsSlice.reducer;
