/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/Skeleton';
import Sort, { sortValues } from '../components/Sort';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import getPizzas from '../redux/ac/pizzas.ac';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state) => state.filterReducer,
  );
  const { items, error, isLoading } = useSelector((state) => state.pizzasReducer);

  const fetchPizzas = async () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sort = sortType.sortProperty.replace('-', '');
    const reqCategory = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      getPizzas({
        order,
        sort,
        reqCategory,
        search,
        currentPage,
      }),
    );
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
  }, [categoryId, sortType, searchValue, currentPage]);

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
      {error ? (
        <div className="content__error-info">
          <h3>Произошла ошибка 😕</h3>
          <p>К сожалению не удалось загрузить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
