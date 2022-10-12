import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAuth } from "app/services/auth";

export const fetchLogin = (params) => async (dispatch) => {
  try {
    const response = await loginAuth(params);
    setId(response.data?.user?.id);
    setToken(response.data?.access_token);
    setPermissions(response.data?.user?.permissions);
    dispatch(updateData(response.data));
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const setupAuth = createSlice({
  name: "auth",
  initialState: {
    auth: {},
  },
  reducers: {
    updateData: (state, action) => {
      return { ...state, auth: { ...action.payload } };
    },
  },
});

export const { updateData } = setupAuth.actions;

export const setId = (id) => {
  localStorage.setItem("id", id);
};
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token") || "";
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getPermissions = () => {
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  if (Array.isArray(permissions)) return permissions;
  else return [];
};

export const setPermissions = (permissions) => {
  if (Array.isArray(permissions)) {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }
};

export const removePermissions = () => {
  localStorage.removeItem("permissions");
};

export default setupAuth.reducer;
