import { createSlice } from '@reduxjs/toolkit'


export const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    value: localStorage.getItem('savedItems')
    ? JSON.parse(localStorage.getItem('savedItems'))
    : []
  },
  reducers: {
    SaveVideo: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem('savedItems', JSON.stringify(state.value))
  },
  clearSaveVideo: (state, action) => {
    state.value = [];
    localStorage.setItem('savedItems',JSON.stringify(state.value));
}
}
})

export const { SaveVideo ,clearSaveVideo } = savedSlice.actions;
export default savedSlice.reducer;
