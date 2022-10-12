import { createSlice } from '@reduxjs/toolkit'
import { IinitialState } from '../interfaces'

const initialState: IinitialState = {
  numberTranscipt: 1,
  totalTranscipt: 2,
  loopVideo: false,
}
export const videoDetailsSlice = createSlice({
  name: 'video-details',
  initialState,
  reducers: {
    changeNumberTranscipt: (state, action) => {
      state.numberTranscipt = action.payload
    },
    changeTotalTranscipt: (state, action) => {
      state.numberTranscipt = action.payload
    },
    loopVideo: (state, action) => {
      state.loopVideo = action.payload
    },
  },
})
export const {
  actions: { changeNumberTranscipt, changeTotalTranscipt, loopVideo },
  reducer,
} = videoDetailsSlice
