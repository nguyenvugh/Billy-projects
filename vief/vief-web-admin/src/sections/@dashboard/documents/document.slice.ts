import { createSlice } from '@reduxjs/toolkit';
import { Fields } from 'src/common/constants/common.interfaces';
import { RootState } from 'src/redux/store';

type StateProps = {
  filterName: string;
  filterField: Fields;
};

const initialState: StateProps = {
  filterName: '',
  filterField: 'ALL',
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    setFilterField: (state, action) => {
      state.filterField = action.payload;
    },
  },
});

export const { setFilterName, setFilterField } = documentSlice.actions;

export const filterNameSelector = (state: RootState) => state.document.filterName;
export const filterFieldSelector = (state: RootState) => state.document.filterField;

export default documentSlice.reducer;
