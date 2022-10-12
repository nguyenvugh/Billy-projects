import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { LANG, ROLE } from './constants';
import { IArticle } from './interfaces';


type stateProps = {
  filterName: string;
  filterRole: string;
  lang: string;
  imagesId:number[];
  articleDetail: IArticle;
  editArticle: editArticle;
};
type editArticle = {
  editTime: boolean;
};

const initialState: stateProps = {
  filterName: '',
  imagesId: [],
  filterRole: ROLE.ALL ,
  articleDetail: {} as IArticle,
  lang: LANG.VI,
  editArticle: {
    editTime: false,
  },
};

export const articleSlice = createSlice({
  name: 'article',
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
    setEditTime: (state, action) => {
      state.editArticle.editTime = action.payload;
    },
  },
});

export const { setFilterName, setFilterRole, setLang, setEditTime } = articleSlice.actions;

export const filterNameSelector = (state: RootState) => state.article.filterName;
export const selectedLangSelector = (state: RootState) => state.article.lang;
export const filterRoleSelector = (state: RootState) => state.article.filterRole;
export const langSelector = (state: RootState) => state.article.lang;
export const editTimeSelector = (state: RootState) => state.article.editArticle.editTime;

export default articleSlice.reducer;
