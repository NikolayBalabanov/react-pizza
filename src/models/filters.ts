import { ISortValue } from './sortValue';

export interface IFiltersState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sortType: ISortValue;
}
