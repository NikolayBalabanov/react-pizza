import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFiltersState } from '../../models/filters';
import { ISortValue } from '../../models/sortValue';

const initialState: IFiltersState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sortType: {
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<ISortValue>) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFiltersState>) {
      const { categoryId, currentPage, sortType } = action.payload;
      state.categoryId = Number(categoryId);
      state.currentPage = Number(currentPage);
      state.sortType = sortType;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
