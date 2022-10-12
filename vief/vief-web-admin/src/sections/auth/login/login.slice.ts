import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { ActionMap, AuthState, AuthUser, JWTContextType } from 'src/@types/auth';


type StateProps = {
  showPassword:boolean;
};
const initialState: StateProps = {
  showPassword:false
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
  },
});



export const {setShowPassword} = loginSlice.actions;


export const showPasswordSelector = (state: RootState) => state.login.showPassword;


export default loginSlice.reducer;

