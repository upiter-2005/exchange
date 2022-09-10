import { configureStore } from "@reduxjs/toolkit";
import activePair from "./slices/activePair";
import filter from "./slices/filterSlice";
import user from "./slices/userSlice";

export const store = configureStore({
  reducer: { activePair, filter, user },
});
