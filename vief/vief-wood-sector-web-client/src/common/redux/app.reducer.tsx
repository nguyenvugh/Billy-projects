import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isPageLoading: boolean;
};
const initialState: InitialState = {
  isPageLoading: false,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
  },
});
export const {
  actions: { setPageLoading },
  reducer,
} = appSlice;
