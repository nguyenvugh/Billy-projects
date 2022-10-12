import { createSlice } from "@reduxjs/toolkit";
import { DocumentsCreate } from "./interfaces";
export type DocumentState = {
  listSelectedDocumentId: string[];
  newDocument: DocumentsCreate & { error: string };
};

const initialState: DocumentState = {
  listSelectedDocumentId: [],
  newDocument: {
    fileId: "",
    title: "",
    error: "",
  },
};

const articleSlice = createSlice({
  name: "document-management",
  initialState,
  reducers: {
    updateSelectedDocumentId(state, action) {
      state.listSelectedDocumentId = action.payload;
    },
    updatenewDocument(state, action) {
      state.newDocument = { ...state.newDocument, ...action.payload };
    },
  },
});

export const {
  reducer,
  actions: { updateSelectedDocumentId, updatenewDocument },
} = articleSlice;
