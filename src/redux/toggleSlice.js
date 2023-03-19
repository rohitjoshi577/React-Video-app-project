import { createSlice } from '@reduxjs/toolkit'

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    value: true,
  },
  reducers: {
    callToggle: (state, action) => {
      state.value = ! state.value;
    },
    ToggleOff:(state,action) =>{
      state.value = false;
    },
    ToggleOn:(state,action)=>{
      state.value=true;
    }
  },
})

export const {callToggle , ToggleOff ,ToggleOn } = toggleSlice.actions

export default toggleSlice.reducer;