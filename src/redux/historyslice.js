import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: [],
  },

  reducers: {
    addToHistory: (state, action) => {
      state.value = [...state.value,action.payload];
  },
  clearHistory:(state,action)=>{
    state.value =[];
  }
}
})

export const { addToHistory , clearHistory} = historySlice.actions

export default historySlice.reducer;