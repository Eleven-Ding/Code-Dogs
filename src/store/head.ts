import { User } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HeaderContext {
  currentTab: string;
  userInfo: User | null;
  showLoginPanel: boolean;
}

const initialState: HeaderContext = {
  currentTab: "/",
  userInfo: null,
  showLoginPanel: false,
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
    changeShowLoginPanel: (state, action: PayloadAction<boolean>) => {
      state.showLoginPanel = action.payload;
    },
  },
});

export const { changeCurrentTab, changeUserInfo, changeShowLoginPanel } =
  counterSlice.actions;

export default counterSlice.reducer;
