import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { LANG } from './constants';
import { langs } from '../setup/banner/constants';
import { LangObj } from '../setup/banner/interfaces';
import { IDetailCategory, ISelectedLang } from './interfaces';

type createNew = {
  postingTime: boolean;
};
type editCategory = {
  editTime: boolean;
};
type StateProps = {
  filterName: string;
  filterRole: string;
  lang: string;
  createNew: createNew;
  editCategory: editCategory;
  selectedLang: LangObj;
  categoryDetail: IDetailCategory;
};

const initialState: StateProps = {
  filterName: '',
  filterRole: 'ALL',
  lang: LANG.VI,
  createNew: {
    postingTime: false,
  },
  editCategory: {
    editTime: false,
  },
  selectedLang: langs.vi,
  categoryDetail: {} as IDetailCategory,
};

export const categorySlice = createSlice({
  name: 'categoy',
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setPostingTime: (state, action) => {
      state.createNew.postingTime = action.payload;
    },

    setEditTime: (state, action) => {
      state.editCategory.editTime = action.payload;
    },
    setSelectedLang: (state, action: ISelectedLang) => {
      state.selectedLang = action.payload;
    },
    setCategoryDetail: (state, action: { payload: IDetailCategory; type: string }) => {
      state.categoryDetail = action.payload;
    },
  },
});

export const {
  setFilterName,
  setFilterRole,
  setLang,
  setPostingTime,
  setEditTime,
  setSelectedLang,
  setCategoryDetail,
} = categorySlice.actions;

export const filterNameSelector = (state: RootState) => state.category.filterName;
export const filterRoleSelector = (state: RootState) => state.category.filterRole;
export const langSelector = (state: RootState) => state.category.lang;
export const postingTimeSelector = (state: RootState) => state.category.createNew.postingTime;
export const editTimeSelector = (state: RootState) => state.category.editCategory.editTime;

export const selectedLangSelector = (state: RootState) => state.category.selectedLang;
export const categoryDetailSelector = (state: RootState) => state.category.categoryDetail;

export default categorySlice.reducer;
