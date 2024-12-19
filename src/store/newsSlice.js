import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../services/api';

export const fetchNewsData = createAsyncThunk('news/fetchNewsData', async (category) => {
  const response = await fetchNews(category || 'Indonesia');
  return response;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;