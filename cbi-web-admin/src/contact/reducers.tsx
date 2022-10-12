import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContactI, ContactParamsI, DeleteParamsI, ListContactI } from "./interfaces";
import { deleteContactService, getListContactService } from "./services";
import { DefaultContact } from "./contstants";
export type ContactState = {
  listContact: ListContactI;
  detail: ContactI;
  total: number;
};

export const getListContactAction = createAsyncThunk(
  "list-contact",
  async (params: ContactParamsI) => {
    const res = await getListContactService(params);
    return res;
  },
);

export const getDetailAction = createAsyncThunk("detail-contact", (contact: ContactI) => {
  return contact;
});

export const deleteContactAction = createAsyncThunk(
  "delete-contact",
  async (params: DeleteParamsI) => {
    const res = await deleteContactService({ ids: params });
    return res;
  },
);

const initialState: ContactState = {
  listContact: [],
  detail: DefaultContact,
  total: 0,
};

const ContactSlice = createSlice({
  name: "list-contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // list
    builder.addCase(getListContactAction.pending, (state) => {
      state.listContact = [];
    });
    builder.addCase(getListContactAction.rejected, (state) => {
      state.listContact = [];
    });
    builder.addCase(getListContactAction.fulfilled, (state, action) => {
      state.listContact = action.payload.data.results || [];
      state.total = action.payload.data.total || 0;
    });
    // detail
    builder.addCase(getDetailAction.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
  },
});

export const { reducer } = ContactSlice;
