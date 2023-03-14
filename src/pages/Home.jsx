import React, { useEffect, useState, useContext, useRef } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/Skeleton';
import Sort, { sortValues } from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filterReducer);
  const { searchVal } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sort = sortType.sortProperty.replace('-', '');
    const reqCategory = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchVal ? `&search=${searchVal}` : '';
    axios
      .get(
        `https://640dd7041a18a5db8380ebec.mockapi.io/items?page=${currentPage}&limit=4${reqCategory}&sortBy=${sort}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      const sortType = sortValues.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sortType,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchVal, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <PizzaLoader key={index} />);
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

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

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
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
