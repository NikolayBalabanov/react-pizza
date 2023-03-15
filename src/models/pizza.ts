export interface IPizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: string;
  rating: number;
  count: number;
}

export interface IPizzasState {
  isLoading: boolean;
  error: string;
  items: IPizzaItem[];
}

export interface IGetPizzasProps {
  currentPage: number;
  reqCategory: string;
  sort: string;
  order: string;
  search: string;
}
