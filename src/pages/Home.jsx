import React, { useEffect, useState, useContext } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sortType } = useSelector((state) => state.filterReducer);
  const { searchVal } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.name.includes('ASC') ? 'asc' : 'desc';
    const sort = sortType.sortProperty;
    const reqCategory = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchVal ? `&search=${searchVal}` : '';
    fetch(
      `https://640dd7041a18a5db8380ebec.mockapi.io/items?page=${currentPage}&limit=4&${reqCategory}&sortBy=${sort}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchVal, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaLoader key={index} />);
  const pizzas = items.map((pizza) => (
    <PizzaBlock
      id={pizza.id}
      key={pizza.id}
      imageUrl={pizza.imageUrl}
      title={pizza.title}
      types={pizza.types}
      sizes={pizza.sizes}
      category={pizza.category}
      price={pizza.price}
      rating={pizza.rating}
    />
  ));

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
}

export default Home;
