import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HeaderContext {
  currentTab: string;
}

const initialState: HeaderContext = {
  currentTab: "/",
};

export const counterSlice = createSlice({
  name: "HeaderContext",
  initialState,
  reducers: {
    changeCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { changeCurrentTab } = counterSlice.actions;

export default counterSlice.reducer;
