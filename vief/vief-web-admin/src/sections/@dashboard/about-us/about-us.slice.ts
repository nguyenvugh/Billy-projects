import { createSlice } from '@reduxjs/toolkit';
import { langs } from 'src/common/constants/common.constants';
import { ISelectedLang, LangObj } from 'src/common/constants/common.interfaces';
import { RootState } from 'src/redux/store';

type StateProps = {
  selectedLang: LangObj;
  editMode: boolean;
};

const initialState: StateProps = {
  selectedLang: langs.vi,
  editMode: false,
};

export const aboutUsSlice = createSlice({
  name: 'about-us',
  initialState,
  reducers: {
    setSelectedLang: (state, action: ISelectedLang) => {
      state.selectedLang = action.payload;
    },
    setEditMode: (state, action: { payload: boolean; type: string }) => {
      state.editMode = action.payload;
    },
  },
});

export const { setSelectedLang, setEditMode } = aboutUsSlice.actions;

export const selectedLangSelector = (state: RootState) => state.aboutUs.selectedLang;
export const editModeSelector = (state: RootState) => state.aboutUs.editMode;

export default aboutUsSlice.reducer;
