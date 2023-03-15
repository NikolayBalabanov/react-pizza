import { combineReducers } from 'redux';
import filterReducer from '../slices/filterSlice';
import cartReducer from '../slices/cartSlice';
import pizzasReducer from '../slices/pizzasSlice';

const rootReducer = combineReducers({
  filterReducer,
  cartReducer,
  pizzasReducer,
});

export default rootReducer;
