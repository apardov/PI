import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ pokemon }) => {
  const { id, img, name, type } = pokemon;

  return (
    <div className={styles.Card}>
      <Link to={`/home/${id}`} className={styles.link}>
        <div className={styles['img-container']}>
          <img src={img} alt="Pokemon" />
        </div>
        <p className={styles.name}>Name: {name}</p>
        <p className={styles.info}>Types: {type.join(', ')}</p>
      </Link>
    </div>
  );
};

export default Card;
