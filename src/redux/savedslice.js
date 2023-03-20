import { createSlice } from '@reduxjs/toolkit'


export const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    value: []
  },
  reducers: {
    SaveVideo: (state, action) => {
      state.value = [...state.value , action.payload];
      console.log(state.value);
  }
}
})

export const { SaveVideo } = savedSlice.actions;
export default savedSlice.reducer;
