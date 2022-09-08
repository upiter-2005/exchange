import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterTo: "usdt",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filterTo = action.payload;
    },
  },
});
export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
