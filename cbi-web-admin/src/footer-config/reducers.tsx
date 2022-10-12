import { createSlice } from "@reduxjs/toolkit";

type initialStateTypes = {
  dataCompany: object;
};

const initialState: initialStateTypes = {
  dataCompany: {},
};

export const footerConfigSlice = createSlice({
  name: "footer-config",
  initialState,
  reducers: {
    saveDataCompany: (state, action) => {
      state.dataCompany = action.payload;
    },
  },
});

export const {
  actions: { saveDataCompany },
  reducer,
} = footerConfigSlice;
