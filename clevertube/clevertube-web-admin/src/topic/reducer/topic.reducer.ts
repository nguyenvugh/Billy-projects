import { createSlice } from "@reduxjs/toolkit";
import { InitialStateTopicType } from "../interface";

const initialState: InitialStateTopicType = {
  search: "",
  page: 1,
  limit: 10,
  selectedItemIds: [],
  isChecked: false,
  isLoading: false,
  isFetching: false,
  checkedItem: false,
  checkedItemAll: false,
};

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSelectedItemIds: (state, action) => {
      state.selectedItemIds = action.payload;
    },
    setIsChecked: (state, action) => {
      state.isChecked = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setCheckedItem: (state, action) => {
      state.checkedItem = action.payload;
    },
    setCheckedItemAll: (state, action) => {
      state.checkedItemAll = action.payload;
    },
  },
});

export const {
  actions: {
    setSearch,
    setPage,
    setLimit,
    setSelectedItemIds,
    setIsChecked,
    setIsLoading,
    setIsFetching,
    setCheckedItem,
    setCheckedItemAll,
  },
  reducer,
} = topicSlice;
