import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: []
  },

  reducers: {
    addToHistory: (state, action) => {
      state.value = [...state.value,action.payload];
  }

}
})

export const { addToHistory } = historySlice.actions

export default historySlice.reducer;