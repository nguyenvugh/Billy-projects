import { createSlice } from "@reduxjs/toolkit";
import { InitialStateVideoType } from "./interface";

// Will be delete after using api

const initialState: InitialStateVideoType = {
  checkedItem: false,
  search: "",
};
export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCheckedItem: (state, action) => {
      state.checkedItem = action.payload;
    },
  },
});
export const {
  actions: { setSearch, setCheckedItem },
  reducer,
} = videoSlice;
