import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "BTC",
  exchangeTo: "USDT",
  chartInterval: "1d",
  clickPrice: null,
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
    setClickPrice: (state, action) => {
      state.clickPrice = action.payload;
    },
  },
});
export const { setCurrency, setInterval, setClickPrice } =
  activePairSlice.actions;

export default activePairSlice.reducer;
