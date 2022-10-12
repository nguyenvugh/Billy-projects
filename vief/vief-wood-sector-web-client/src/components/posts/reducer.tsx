import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./posts.interface";

const initialState: initialState = {
  hello: "world",
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    helloWorld: (state, action) => {
      return (state.hello = action.payload);
    },
  },
});
export const {
  actions: { helloWorld },
  reducer,
} = postsSlice;
