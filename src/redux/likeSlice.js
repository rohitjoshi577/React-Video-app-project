import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({
  name: 'like',
  initialState: {
    value: []
  },

  reducers :{
    StoreLike: (state, action) => {
    state.value = [...state.value , action.payload];
  },

  ClearLike: (state, action) => {
    state.value = [];
  },

  removeLike :(state, action)=>{
    state.value = state.value.filter((videoId)=>{
      if(videoId != action.payload){
        return true;
      }})}
  }
          
})

export const {StoreLike ,removeLike , ClearLike} = likeSlice.actions;

export default likeSlice.reducer;


