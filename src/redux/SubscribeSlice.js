import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const subscribe= createSlice({
  name: 'subscribe',
  initialState: {
    value: localStorage.getItem('subscribedItems')
    ? JSON.parse(localStorage.getItem('subscribedItems'))
    : []
  },
  reducers: {


   subscribeChannel:(state , action)=>{
      state.value = [...state.value, action.payload];
      toast.info('channel subscribed', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      
    localStorage.setItem('subscribedItems', JSON.stringify(state.value))
    },
    

   unsubscribeChannel:(state ,action)=>{
    state.value = state.value.filter((element)=>{
      return(
        element != action.payload
      )
    });
    toast.success('channel unsubscribed', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    localStorage.setItem('subscribedItems', JSON.stringify(state.value))
  },

   
  deleteData:(state,action)=>{
    state.value = [];
    localStorage.setItem('subscribedItems', JSON.stringify(state.value))
  }

  }
})


export const { subscribeChannel  , unsubscribeChannel ,deleteData} = subscribe.actions;
export default subscribe.reducer;