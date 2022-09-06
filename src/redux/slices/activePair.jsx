import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "ETH",
  exchangeTo: "USDT",
  chartInterval: "1d",
};

export const activePairSlice = createSlice({
  name: "activePair",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setInterval: (state, action) => {
      state.chartInterval = action.payload;
    },
  },
});
export const { setCurrency, setInterval } = activePairSlice.actions;

export default activePairSlice.reducer;
