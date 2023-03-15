import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizzaItem, IPizzasState } from '../../models/pizza';
import getPizzas from '../ac/pizzas.ac';

const initialState: IPizzasState = {
  items: [],
  isLoading: true,
  error: '',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [getPizzas.fulfilled.type]: (state, action: PayloadAction<IPizzaItem[]>) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = '';
    },
    [getPizzas.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPizzas.rejected.type]: (state) => {
      state.isLoading = false;
      state.error = 'ошибка при загрузке пицц';
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
