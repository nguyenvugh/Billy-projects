import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./interface";

const initialState: InitialState = {
  hello: "world",
};
export const homePageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    helloWord: (state, action) => {
      state.hello = action.payload;
    },
  },
});
export const {
  actions: { helloWord },
  reducer,
} = homePageSlice;
