import { configureStore } from "@reduxjs/toolkit";
import activePair from "./slices/activePair";
import filter from "./slices/filterSlice";

export const store = configureStore({
  reducer: { activePair, filter },
});
