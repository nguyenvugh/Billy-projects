import { createSlice } from "@reduxjs/toolkit";

type initialStateTypes = {
  adminId: string;
};
const initialState: initialStateTypes = {
  adminId: "",
};
export const adminAccountSlice = createSlice({
  name: "admin-account",
  initialState,
  reducers: {
    getAdminId: (state, action) => {
      state.adminId = action.payload;
    },
  },
});

export const {
  actions: { getAdminId },
  reducer,
} = adminAccountSlice;
