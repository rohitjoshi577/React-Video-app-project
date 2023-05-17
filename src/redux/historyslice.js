import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: localStorage.getItem('searchHistory')
    ? JSON.parse(localStorage.getItem('searchHistory'))
    : []
  },

  reducers: {
    addToHistory: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem('searchHistory', JSON.stringify(state.value));
  },
  clearHistory:(state,action)=>{
    state.value = [];
    localStorage.setItem('searchHistory', JSON.stringify(state.value));
  }
}
})

export const { addToHistory , clearHistory} = historySlice.actions

export default historySlice.reducer;