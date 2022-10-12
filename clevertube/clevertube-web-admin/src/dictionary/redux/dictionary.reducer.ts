import { createSlice } from "@reduxjs/toolkit";
import { IDictInitialState } from "../interface";

const initialState: IDictInitialState = {
  examples: [],
  newWord: "",
  description: "",
  validateExample: false,
  exampleValue: "",
};
export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    addNewExample: (state, action) => {
      state.examples.unshift(action.payload);
    },
    addNewWord: (state, action) => {
      state.newWord = action.payload;
    },
    addNewDescription: (state, action) => {
      state.description = action.payload;
    },
    removeExample: (state, action) => {
      state.examples = state.examples.filter((example) => example.id !== action.payload);
    },
    validateExample: (state, action) => {
      state.validateExample = action.payload;
    },
    listenValueExample: (state, action) => {
      state.exampleValue = action.payload;
    },
  },
});
export const {
  actions: {
    addNewExample,
    removeExample,
    addNewWord,
    addNewDescription,
    validateExample,
    listenValueExample,
  },
  reducer,
} = dictionarySlice;
