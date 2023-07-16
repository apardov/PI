import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import styles from './CardContainer.module.css';

const CardContainer = ({ pokemons }) => {
  const selectedType = useSelector((state) => state.selectedType);

  const filteredPokemons = selectedType
    ? pokemons.filter((pokemon) => pokemon.type.includes(selectedType))
    : pokemons;

  return (
    <div className={styles.CardContainer}>
      {filteredPokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CardContainer;




