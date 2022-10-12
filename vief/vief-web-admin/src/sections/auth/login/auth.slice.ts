import { createSlice } from '@reduxjs/toolkit';
import { accessToken } from 'mapbox-gl';
import { RootState } from 'src/redux/store';
type AuthLoginProps = {
  isAuthenticated: boolean;
  accessToken :string

};
const AuthLoginState: AuthLoginProps = {
  isAuthenticated: false,
  accessToken:''
};
export const authLoginSlice = createSlice({
  name: 'authLogin',
  initialState: AuthLoginState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action)=>{
      state.accessToken=action.payload
    },
    setLogout: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setLogin, setLogout,setAccessToken } = authLoginSlice.actions;
export const loginSelector = (state: RootState) => state.authLogin.isAuthenticated;
export const logoutSelector = (state: RootState) => state.authLogin.isAuthenticated;
export const accessTokenSelector = (state: RootState) => state.authLogin.accessToken;


export default authLoginSlice.reducer;
