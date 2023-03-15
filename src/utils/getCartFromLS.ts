import { ICartItem } from '../models/cart';

export const getCartFromLS = (): ICartItem[] => {
  const dataFromLS = localStorage.getItem('cart');
  return dataFromLS ? JSON.parse(dataFromLS) : [];
};

export const getTotalPrice = (arr: ICartItem[]) => {
  return arr.reduce((acc, cur) => acc + cur.price * cur.count, 0);
};

export const getCartCnt = (arr: ICartItem[]) => {
  return arr.reduce((acc, cur) => acc + cur.count, 0);
};

export const getInitialStateFromLS = () => {
  const itemsArr = getCartFromLS();
  if (itemsArr.length) {
    const totalPrice = getTotalPrice(itemsArr);
    const cartCnt = getCartCnt(itemsArr);
    return {
      totalPrice,
      cartCnt,
      items: itemsArr,
    };
  } else {
    return {
      totalPrice: 0,
      cartCnt: 0,
      items: [],
    };
  }
};
