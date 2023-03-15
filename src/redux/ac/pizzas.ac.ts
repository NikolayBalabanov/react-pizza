import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IGetPizzasProps, IPizzaItem } from '../../models/pizza';

const getPizzas = createAsyncThunk(
  'pizzas/getPizzas',
  async ({ currentPage, reqCategory, sort, order, search }: IGetPizzasProps, thunkAPI) => {
    const { data } = await axios.get<IPizzaItem[]>(
      `https://640dd7041a18a5db8380ebec.mockapi.io/items?page=${currentPage}&limit=4${reqCategory}&sortBy=${sort}&order=${order}${search}`,
    );
    return data;
  },
);

export default getPizzas;
