import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { langs } from '../setup/banner/constants';
import { LangObj } from '../setup/banner/interfaces';
import { IDetailPolicy, IFieldsPolicy, ISelectedLang } from './interface';

type StateProps = {
  filterName: string;
  filterField: IFieldsPolicy;
  selectedLang: LangObj;
  policyDetail: IDetailPolicy;
  checkImage:boolean
  thumbnailId:number
  imagesId:number[]
  checkImageEdit: boolean
  idTempEdit:number[]

};

const initialState: StateProps = {
  filterName: '',
  filterField: 'ALL',
  selectedLang: langs.vi,
  policyDetail: {} as IDetailPolicy,
  checkImage:false,
  thumbnailId: 0,
  imagesId:[],
  checkImageEdit:false,
  idTempEdit:[]


};

export const policySlice = createSlice({
  name: 'policy',
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
    setPolicytDetail: (state, action: { payload: IDetailPolicy; type: string }) => {
      state.policyDetail = action.payload;
    },
    setCheckImage:(state, action)=>{
      state.checkImage=action.payload
    },
    setThumbnailId:(state, action)=>{
      state.thumbnailId=action.payload
    },
    setImagesId:(state, action)=>{
      state.imagesId=action.payload
    },
    setCheckImageEdit:(state, action)=>{
      state.checkImageEdit=action.payload
    },
    setIdTempEdit:(state, action)=>{
      state.idTempEdit=action.payload
    },
  },
});

export const { setFilterName, setFilterField, setSelectedLang, setPolicytDetail,setCheckImage,setImagesId,setThumbnailId,setCheckImageEdit,setIdTempEdit} = policySlice.actions;

export const filterNameSelector = (state: RootState) => state.policy.filterName;
export const filterFieldSelector = (state: RootState) => state.policy.filterField;
export const selectedLangSelector = (state: RootState) => state.policy.selectedLang;
export const policyDetailSelector = (state: RootState) => state.policy.policyDetail;
export const checkImageSelector = (state: RootState) => state.policy.checkImage;
export const thumbnailIdSelector = (state: RootState) => state.policy.thumbnailId;
export const imagesIdSelector = (state: RootState) => state.policy.imagesId;
export const checkImageEditSelector = (state: RootState) => state.policy.checkImageEdit;
export const idTempEditSelector = (state: RootState) => state.policy.idTempEdit;







export default policySlice.reducer;
