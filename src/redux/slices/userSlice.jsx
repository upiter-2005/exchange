import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  uid: null,
  balance: { USDT: 0 },
  orders: [],
  updating: false,
};

export const updateUserBalance = createAsyncThunk(
  "user/updateBalance",
  async (params, { getState }) => {
    const state = getState();
    const balanceData = {
      balance: params,
      orders: state.user.orders,
    };
    const response = await fetch(
      `https://627eb2bb271f386ceffc342c.mockapi.io/bitlex/${state.user.uid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(balanceData),
      }
    );
    const result = response.json();

    return result;
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async (params) => {
    const data = await fetch(
      `https://627eb2bb271f386ceffc342c.mockapi.io/bitlex/?user=${params}`
    )
      .then((response) => response.json())
      .then((response) => response);

    return data[0];
  }
);

export const createUserData = createAsyncThunk(
  "user/createData",
  async (id) => {
    const user = {
      user: id,
      balance: { USDT: 0 },
      orders: [],
    };
    const response = fetch(
      "https://627eb2bb271f386ceffc342c.mockapi.io/bitlex/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      }
    );
    const result = await response.json();
    console.log(result.message);

    return result;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.isAuth = false;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.uid = action.payload.id;
      state.balance = action.payload.balance;
      state.orders = action.payload.orders;
      state.isAuth = true;
    },
    [fetchUserData.rejected]: (state) => {
      state.isAuth = false;
    },
    [createUserData.pending]: (state) => {
      state.isAuth = false;
    },
    [createUserData.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.uid = action.payload.id;
      state.balance = action.payload.balance;
      state.orders = action.payload.orders;
    },
    [createUserData.rejected]: (state) => {
      state.isAuth = false;
    },
    [updateUserBalance.pending]: (state) => {
      state.updating = true;
    },
    [updateUserBalance.fulfilled]: (state, action) => {
      console.log("update Balance");
      console.log(action.payload);
      state.updating = false;
    },
    [updateUserBalance.rejected]: (state) => {
      state.updating = true;
    },
  },
  reducers: {
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
      const recalc =
        Number(state.balance[coin]) + Number(action.payload.quntity);
      state.balance = { ...state.balance, [coin]: recalc };
    },
    logOutUser: (state) => {
      state.isAuth = false;
      state.uid = null;
      state.balance = { USDT: 0 };
      state.orders = [];
    },
  },
});
export const {
  addOrderSell,
  addOrderBuy,
  removeOrder,
  moneyBackBuy,
  moneyBackSell,
  logOutUser,
} = userSlice.actions;

export default userSlice.reducer;
