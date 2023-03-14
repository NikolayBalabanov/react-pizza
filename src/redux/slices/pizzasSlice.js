import { createSlice } from '@reduxjs/toolkit';
import getPizzas from '../ac/pizzas.ac';

const initialState = {
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
    [getPizzas.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.items = action.payload;
      state.error = '';
    },
    [getPizzas.pending]: (state) => {
      state.isLoading = true;
    },
    [getPizzas.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      console.log('payload error', action.payload);
      state.error = 'ошибка при загрузке пицц';
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
