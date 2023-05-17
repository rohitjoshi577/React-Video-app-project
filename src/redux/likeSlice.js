import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({
  name: 'like',
  initialState: {
    value: localStorage.getItem('videosLiked')
    ? JSON.parse(localStorage.getItem('videosLiked'))
    : []
  },

  reducers :{
    StoreLike: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem('videosLiked', JSON.stringify(state.value));
  },

  ClearLike: (state, action) => {
    state.value = [];
    localStorage.setItem('videosLiked', JSON.stringify(state.value));
  },

  removeLike :(state, action)=>{
    state.value = state.value.filter((videoId)=>{
      if(videoId != action.payload){
        return true;
      }
    }
    )

    localStorage.setItem('videosLiked', JSON.stringify(state.value))

  }
  }
          
})

export const {StoreLike ,removeLike , ClearLike} = likeSlice.actions;

export default likeSlice.reducer;


