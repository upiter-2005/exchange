import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "BTC",
  exchangeTo: "USDT",
};

export const activePairSlice = createSlice({
  name: "activePair",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      // state.catId = action.payload;
    },
  },
});
export const { setCurrency } = activePairSlice.actions;

export default activePairSlice.reducer;
