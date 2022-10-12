import { createSlice } from "@reduxjs/toolkit";
import { InitialStateType } from "../interface";

const initialState: InitialStateType = {
  userInfo: {
    emailLogin: "",
    passwordLogin: "",
  },
  rememberUser: false,
  clickSubmit: false,
};
export const userInfoSlice = createSlice({
  name: "info-login",
  initialState,
  reducers: {
    emailAndPassword: (state, action) => {
      state.userInfo = action.payload;
    },
    rememberUser: (state, action) => {
      state.rememberUser = action.payload;
    },
    isLoggedIn: (state, action) => {
      state.clickSubmit = action.payload;
    },
  },
});
export const {
  actions: { emailAndPassword, rememberUser, isLoggedIn },
  reducer,
} = userInfoSlice;
