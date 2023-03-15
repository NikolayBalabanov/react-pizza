export interface ICartItem extends INewCartItem {
  count: number;
}

export interface INewCartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
}

export interface ICartState {
  totalPrice: number;
  cartCnt: number;
  items: ICartItem[];
}
