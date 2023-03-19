import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from "./toggleSlice";
import fetchApiReducer from "./apiSlice";
import historyReducer from './historyslice';
import likeReducer from './likeSlice';

export default configureStore({
  reducer: {
    toggle : toggleReducer,
    fetchApi : fetchApiReducer,
    history : historyReducer,
    like : likeReducer,

  },
})