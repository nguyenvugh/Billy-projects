import { createSlice } from '@reduxjs/toolkit';
import { ISelectedLang } from 'src/common/constants/common.interfaces';
import { RootState } from 'src/redux/store';
import { langs } from '../setup/banner/constants';
import { LangObj } from '../setup/banner/interfaces';
import { IDetailEvent, IFieldsEvent } from './interfaces';

type StateProps = {
  [x: string]: any;
  filterName: string;
  filterField: IFieldsEvent;
  selectedLang: LangObj;
  eventDetail: IDetailEvent;
};

const initialState: StateProps = {
  filterName: '',
  filterField: 'ALL',
  selectedLang: langs.vi,
  eventDetail: {} as IDetailEvent,
};

export const eventSlice = createSlice({
  name: 'event',
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
    setEventDetail: (state, action: { payload: IDetailEvent; type: string }) => {
      state.eventDetail = action.payload;
    },
  },
});

export const { setFilterName, setFilterField, setSelectedLang, setEventDetail } =
  eventSlice.actions;

export const filterNameSelector = (state: RootState) => state.event.filterName;
export const filterFieldSelector = (state: RootState) => state.event.filterField;
export const selectedLangSelector = (state: RootState) => state.event.selectedLang;
export const eventDetailSelector = (state: RootState) => state.event.eventDetail;

export default eventSlice.reducer;
