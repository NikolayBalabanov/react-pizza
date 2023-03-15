import { memo } from 'react';

interface ICategoriesProps {
  value: number;
  onChangeCategory: (e: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

const Categories = memo(function Categories({ value, onChangeCategory }: ICategoriesProps) {
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
});

export default Categories;
