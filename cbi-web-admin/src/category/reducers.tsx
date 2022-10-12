import { createSlice } from "@reduxjs/toolkit";

export type ArticleCateState = {
  selectedIds: string[];
  countSubmitDelete: number;
};

const initialState: ArticleCateState = {
  selectedIds: [],
  countSubmitDelete: 0,
};

const articleCateSlice = createSlice({
  name: "articleCateSlice",
  initialState,
  reducers: {
    updateSelectedIds(state, action) {
      state.selectedIds = action.payload;
    },
    updatecountSubmitDelete(state, action) {
      state.countSubmitDelete = action.payload;
    },
  },
});

export const {
  reducer,
  actions: { updateSelectedIds, updatecountSubmitDelete },
} = articleCateSlice;
