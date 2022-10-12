import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./interface";

const initialState: InitialState = {
  newUserData: {
    name: "",
    age: "",
    address: "",
  },
};
export const homePageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.newUserData = action.payload;
      console.log(state.newUserData);
    },
  },
});
export const {
  actions: { addNewUser },
  reducer,
} = homePageSlice;
