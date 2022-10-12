import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { IFormAddNewAccount } from './interface';

type StateProps = {
  showPassword:boolean;
  accountDetail: IFormAddNewAccount;
};

const initialState: StateProps = {
  showPassword:false,
  accountDetail: {} as IFormAddNewAccount,
};

export const addAccountSlice = createSlice({
  name: 'add-new-account',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setAccountDetail: (state, action: { payload: IFormAddNewAccount; type: string }) => {
      state.accountDetail = action.payload;
    },
  },
});

export const {setShowPassword, setAccountDetail} = addAccountSlice.actions;

export const showPasswordSelector = (state: RootState) => state.addAccount.showPassword;
export const accountDetailSelector = (state: RootState) => state.addAccount.accountDetail;

export default addAccountSlice.reducer;
