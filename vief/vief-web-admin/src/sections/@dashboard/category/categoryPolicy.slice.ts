import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { langs } from '../setup/banner/constants';
import { LangObj } from '../setup/banner/interfaces';
import { LANG } from './constants';
import { IDetailCategoryPolicy, IFieldsCategoryPolicy, ISelectedLang } from './interfaces';

type StateProps = {
  filterName: string;
  filterField: IFieldsCategoryPolicy;
  lang: string;
  selectedLang: LangObj;
  categoryPolicyDetail: IDetailCategoryPolicy;
};

const initialState: StateProps = {
  filterName: '',
  filterField: 'ALL',
  lang: LANG.VI,
  selectedLang: langs.vi,
  categoryPolicyDetail: {} as IDetailCategoryPolicy,
};

export const categoryPolicySlice = createSlice({
  name: 'category-policy',
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    setFilterField: (state, action) => {
      state.filterField = action.payload;
    },
    setSelectedLang: (state, action: ISelectedLang) => {
      state.selectedLang = action.payload;
    },
    setCategoryPolicyDetail: (state, action: { payload: IDetailCategoryPolicy; type: string }) => {
      state.categoryPolicyDetail = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setFilterName, setFilterField, setSelectedLang, setCategoryPolicyDetail } =
  categoryPolicySlice.actions;

export const filterNameSelector = (state: RootState) => state.categoryPolicy.filterName;
export const filterFieldSelector = (state: RootState) => state.categoryPolicy.filterField;
export const selectedLangSelector = (state: RootState) => state.categoryPolicy.selectedLang;
export const categoryPolicyDetailSelector = (state: RootState) => state.categoryPolicy.categoryPolicyDetail;
export const langSelector = (state: RootState) => state.categoryPolicy.lang;

export default categoryPolicySlice.reducer;
