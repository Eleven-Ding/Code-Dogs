import { User } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HeaderContext {
  currentTab: string;
  userInfo: User | null;
}

const initialState: HeaderContext = {
  currentTab: "/",
  userInfo: null,
};

export const counterSlice = createSlice({
  name: "HeaderContext",
  initialState,
  reducers: {
    changeCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
    changeUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { changeCurrentTab, changeUserInfo } = counterSlice.actions;

export default counterSlice.reducer;
