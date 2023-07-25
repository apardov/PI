// Objetivo: Mostrar los pokemons en cards

// importaciones
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ pokemon }) => { // recibe como props el pokemon desde CardContainer
  const { id, img, name, attack, type } = pokemon; // destructuring de pokemon

  return (
    <div className={styles.Card}>
      <Link to={`/home/${id}`} className={styles.link}> {/* Link a la ruta /home/id */}
        <div className={styles['img-container']}>
          <img src={img} alt="Pokemon" /> {/* Imagen del pokemon */}
        </div> 
        <p className={styles.name}>Name: {name}</p> {/* Nombre del pokemon */}
        <p className={styles.info}>Attack: {attack}</p>
        <p className={styles.info}>Type: {type.join(', ')}</p> {/* Tipo del pokemon */}
      </Link>
    </div>
  );
};

export default Card;
