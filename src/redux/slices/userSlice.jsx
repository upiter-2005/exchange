import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isAuth: false,
  balance: { USDT: 3700, BTC: 0.33, ETH: 1.45, LTC: 2.8 },
  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    addOrderSell: (state, action) => {
      const coin = action.payload.currency;
      const res = state.balance[coin] - action.payload.amount;
      state.balance = { ...state.balance, [coin]: res };
      state.orders = [...state.orders, action.payload];
    },
    addOrderBuy: (state, action) => {
      const coin = action.payload.exchangeTo;
      const res =
        state.balance[coin] - action.payload.amount * action.payload.price;
      state.balance = { ...state.balance, [coin]: res };
      state.orders = [...state.orders, action.payload];
    },
    removeOrder: (state, action) => {
      const newOrders = state.orders.filter(
        (obj) => obj.time !== action.payload
      );
      state.orders = [...newOrders];
    },
    moneyBackBuy: (state, action) => {
      const coin = action.payload.exchangeTo;
      const recalc = state.balance[coin] + action.payload.quntity;
      state.balance = { ...state.balance, [coin]: recalc };
    },
    moneyBackSell: (state, action) => {
      const coin = action.payload.currency;
      console.log(coin);
      const recalc =
        Number(state.balance[coin]) + Number(action.payload.quntity);
      console.log(recalc);
      state.balance = { ...state.balance, [coin]: recalc };
    },
  },
});
export const {
  setAuth,
  addOrderSell,
  addOrderBuy,
  removeOrder,
  moneyBackBuy,
  moneyBackSell,
} = userSlice.actions;

export default userSlice.reducer;
