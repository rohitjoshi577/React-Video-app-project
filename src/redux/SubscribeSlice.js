import { createSlice } from '@reduxjs/toolkit';

export const subscribe= createSlice({
  name: 'subscribe',
  initialState: {
    value: []
  },
  reducers: {
   subscribeChannel:(state , action)=>{
    state.value = [...state.value , action.payload ];
   },
   unsubscribeChannel:(state ,action)=>{
    state.value = state.value.filter((element)=>{
      return(
        element != action.payload
      )});
  }

  }
})


export const { subscribeChannel  , unsubscribeChannel} = subscribe.actions;
export default subscribe.reducer;