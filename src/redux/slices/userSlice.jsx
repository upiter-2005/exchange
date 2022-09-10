import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isAuth: false,
  balance: { USDT: 3700, BTC: 0.33, ETH: 1.45, LTC: 2.8 },
  orders: [
    {
      currency: "btc",
      exchangeTo: "USDT",
      price: 20678,
      amount: 0.1,
      type: "sell",
      time: "20:15:54",
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});
export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
