import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ArticleState = {
  isGettingArticle: boolean;
};

export const getArticlesAction = createAsyncThunk("article", async () => {
  const res = new Promise((resolve) => {
    resolve(true);
  });
  return res;
});

const initialState: ArticleState = {
  isGettingArticle: false,
};

const articleSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesAction.pending, (state) => {
      state.isGettingArticle = true;
    });
    builder.addCase(getArticlesAction.rejected, (state) => {
      state.isGettingArticle = false;
    });
    builder.addCase(getArticlesAction.fulfilled, (state) => {
      state.isGettingArticle = false;
    });
  },
});

export const { reducer } = articleSlice;
