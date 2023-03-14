import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  cartCnt: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const targetItem = state.items.find((obj) => {
        return obj.id === newItem.id && obj.size === newItem.size && obj.type === newItem.type;
      });
      if (targetItem) {
        targetItem.count++;
      } else {
        state.items.push({ ...newItem, count: 1 });
      }
      state.totalPrice = state.items.reduce((acc, cur) => acc + cur.price * cur.count, 0);
      state.cartCnt = state.items.reduce((acc, cur) => acc + cur.count, 0);
    },
    subtractItem(state, action) {
      const removedItem = action.payload;
      const targetItem = state.items.find(
        (obj) =>
          obj.id === removedItem.id &&
          obj.size === removedItem.size &&
          obj.type === removedItem.type,
      );
      if (targetItem) {
        if (targetItem.count > 1) {
          targetItem.count--;
        } else {
          state.items = state.items.filter(
            (obj) =>
              obj.id !== removedItem.id ||
              obj.size !== removedItem.size ||
              obj.type !== removedItem.type,
          );
        }
        state.totalPrice = state.items.reduce((acc, cur) => acc + cur.price * cur.count, 0);
        state.cartCnt = state.items.reduce((acc, cur) => acc + cur.count, 0);
      }
    },
    removeItem(state, action) {
      const removedItem = action.payload;
      const targetItem = state.items.find(
        (obj) =>
          obj.id === removedItem.id &&
          obj.size === removedItem.size &&
          obj.type === removedItem.type,
      );
      if (targetItem) {
        state.items = state.items.filter(
          (obj) =>
            obj.id !== removedItem.id ||
            obj.size !== removedItem.size ||
            obj.type !== removedItem.type,
        );
        state.totalPrice = state.items.reduce((acc, cur) => acc + cur.price * cur.count, 0);
        state.cartCnt = state.items.reduce((acc, cur) => acc + cur.count, 0);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.cartCnt = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, subtractItem } = cartSlice.actions;

export default cartSlice.reducer;
