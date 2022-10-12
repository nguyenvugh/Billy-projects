import { createSlice } from "@reduxjs/toolkit";

type initialStatetypes = {
  file: string;
};

const initialState: initialStatetypes = {
  file: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getFile: (state, action) => {
      state.file = action.payload;
    },
  },
});
export const {
  actions: { getFile },
  reducer,
} = profileSlice;
