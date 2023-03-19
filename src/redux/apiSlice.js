import { createSlice } from '@reduxjs/toolkit';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1000493ad2mshb4ce9754a05dffdp192ce9jsn86b5b0b976e4',
		'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
	}
};


const initialState = {
  api: 'https://youtube-v2.p.rapidapi.com/search/?query=gaming&lang=en&country=us',
  options: options
}

export const fetchApiSlice = createSlice({
  name: 'fetchApi',
  initialState,
  reducers: {
    setFetchApi: (state, action) => {
      state.api=`https://youtube-v2.p.rapidapi.com/search/?query=${action.payload}&lang=en&country=us`;
    },
  }
})

export const { setFetchApi } = fetchApiSlice.actions

export default fetchApiSlice.reducer ;