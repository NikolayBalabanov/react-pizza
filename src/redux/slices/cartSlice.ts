import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, INewCartItem } from '../../models/cart';
import { getCartCnt, getInitialStateFromLS, getTotalPrice } from '../../utils/getCartFromLS';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialStateFromLS(),
  reducers: {
    addItem(state, action: PayloadAction<INewCartItem>) {
      const newItem = action.payload;
      const targetItem = state.items.find((obj) => {
        return obj.id === newItem.id && obj.size === newItem.size && obj.type === newItem.type;
      });
      if (targetItem) {
        targetItem.count++;
      } else {
        state.items.push({ ...newItem, count: 1 });
      }
      state.totalPrice = getTotalPrice(state.items);
      state.cartCnt = getCartCnt(state.items);
    },
    subtractItem(state, action: PayloadAction<ICartItem>) {
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
        state.totalPrice = getTotalPrice(state.items);
        state.cartCnt = getCartCnt(state.items);
      }
    },
    removeItem(state, action: PayloadAction<ICartItem>) {
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
        state.totalPrice = getTotalPrice(state.items);
        state.cartCnt = getCartCnt(state.items);
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
