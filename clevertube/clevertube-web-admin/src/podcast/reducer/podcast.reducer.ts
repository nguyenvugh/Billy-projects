import { createSlice } from "@reduxjs/toolkit";
import { InitialStatePodcastType } from "../interface";

const initialState: InitialStatePodcastType = {
  search: "",
  selectedItemIds: [],
  isChecked: false,
  isLoading: false,
  isFetching: false,
  checkedItem: false,
  checkedItemAll: false,
};

export const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
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
    setSelectedItemIds,
    setIsChecked,
    setIsLoading,
    setIsFetching,
    setCheckedItem,
    setCheckedItemAll,
  },
  reducer,
} = podcastSlice;
