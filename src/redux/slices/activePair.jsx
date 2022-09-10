import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "BTC",
  exchangeTo: "USDT",
  chartInterval: "1d",
};

export const activePairSlice = createSlice({
  name: "activePair",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload.currency;
      state.exchangeTo = action.payload.exchangeTo;
    },
    setInterval: (state, action) => {
      state.chartInterval = action.payload;
    },
  },
});
export const { setCurrency, setInterval } = activePairSlice.actions;

export default activePairSlice.reducer;
