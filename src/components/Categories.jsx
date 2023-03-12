import React, { useState } from 'react';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
  const [active, setActive] = useState(0);
  const handleClick = (index) => setActive(index);
  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={cat}
            onClick={() => handleClick(index)}
            className={active === index ? 'active' : ''}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
