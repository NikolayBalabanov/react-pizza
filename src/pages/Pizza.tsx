/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

interface IPizzaData {
  title: string;
  imageUrl: string;
  price: string;
}

function Pizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<IPizzaData | null>(null);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<IPizzaData>(
          `https://640dd7041a18a5db8380ebec.mockapi.io/items/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Oшибка при загрузке пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <Loader />;
  }

  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt={pizza.title} />
      <h3 className="pizza-block__title">{pizza.title}</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus consequatur impedit, totam
        perferendis molestiae vitae sint. Delectus ullam dolore, sequi aut fugiat soluta nemo cumque
        sapiente inventore sit accusamus autem iste est magni quas eveniet iusto magnam ut
        asperiores adipisci?
      </p>
      <h4 className="pizza__title">{pizza.price} ₽</h4>
      <Link to="/" className="button button--outline button--add pizza__back-btn">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>

        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}

export default Pizza;
