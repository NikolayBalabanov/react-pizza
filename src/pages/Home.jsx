import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaLoader from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.name.includes('ASC') ? 'asc' : 'desc';
    const reqCategory = category > 0 ? `category=${category}` : '';
    fetch(
      `https://640dd7041a18a5db8380ebec.mockapi.io/items?${reqCategory}&sortBy=${sortType.sortProperty}&order=${order}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} onChangeCategory={setCategory} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <PizzaLoader key={index} />)
          : items.map((pizza) => (
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
            ))}
      </div>
    </div>
  );
}

export default Home;
