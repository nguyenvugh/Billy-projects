import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { LANG } from './constants';
import { IActionLang, LangType } from './interface';

type stateProps = {
  lang: LangType;
};

const initialState: stateProps = {
  lang: LANG.VI,
};
export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLang: (state, action: IActionLang) => {
      state.lang = action.payload;
    },
  },
});
export const { setLang } = authorizationSlice.actions;

export const langSelector = (state: RootState) => state.authorization.lang;

export default authorizationSlice.reducer;
