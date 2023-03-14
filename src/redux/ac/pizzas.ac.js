import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getPizzas = createAsyncThunk(
  'pizzas/getPizzas',
  async ({ currentPage, reqCategory, sort, order, search }, thunkAPI) => {
    const { data } = await axios.get(
      `https://640dd7041a18a5db8380ebec.mockapi.io/items?page=${currentPage}&limit=4${reqCategory}&sortBy=${sort}&order=${order}${search}`,
    );
    console.log('axios data', data);
    return data;
  },
);

export default getPizzas;
