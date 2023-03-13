import React from 'react';

function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
