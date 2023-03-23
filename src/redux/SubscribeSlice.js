import { createSlice } from '@reduxjs/toolkit';

export const subscribe= createSlice({
  name: 'subscribe',
  initialState: {
    value: []
  },
  reducers: {
   subscribeChannel:(state , action)=>{
    state.value = [...state.value , action.payload ]
   }
  }
})


export const { subscribeChannel } = subscribe.actions;
export default subscribe.reducer;