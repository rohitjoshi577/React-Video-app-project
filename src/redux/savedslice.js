import { createSlice } from '@reduxjs/toolkit'


export const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    value: []
  },
  reducers: {
    SaveVideo: (state, action) => {
      state.value = [...state.value , action.payload];
  },
  clearSaveVideo: (state, action) => {
    state.value = [];
}
}
})

export const { SaveVideo ,clearSaveVideo } = savedSlice.actions;
export default savedSlice.reducer;
