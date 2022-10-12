import { createSlice } from "@reduxjs/toolkit";
import { getContactList, deleteContact } from "app/services/contact";
export const fetchListContact = (params) => async (dispatch, getState) => {
  try {
    const response = await getContactList(params);
    let payload = {
      listContact: response?.data?.results || [],
      totalContacts: response?.data?.total || 0,
    }; 
    dispatch(updateData(payload));
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchDeleteContacts = (params) => async (dispatch, getState) => {
  try {
    const { ids } = params;
    const response = await deleteContact({ ids });
    return response;
  } catch (error) {
    return error;
  }
};
export const setupContact = createSlice({
  name: "contact",
  initialState: {
    listContact: [],
    totalContacts: 0,
    contact: {},
  },
  reducers: {
    updateData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateData } = setupContact.actions;
export default setupContact.reducer;
