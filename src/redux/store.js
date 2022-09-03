import { configureStore } from "@reduxjs/toolkit";
import activePair from "./slices/activePair";

export const store = configureStore({
  reducer: { activePair },
});
