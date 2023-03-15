import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Pizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://640dd7041a18a5db8380ebec.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Oшибка при загрузке пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка';
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
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}

export default Pizza;
