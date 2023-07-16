import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import styles from './CardContainer.module.css';

const CardContainer = () => {
  const selectedType = useSelector((state) => state.selectedType);
  const selectedSource = useSelector((state) => state.selectedSource);
  const pokemons = useSelector((state) => state.pokemons);

  const filteredPokemonsByType = selectedType
    ? pokemons.filter((pokemon) => pokemon.type.includes(selectedType))
    : pokemons;

  const filteredPokemons = selectedSource
    ? filteredPokemonsByType.filter((pokemon) => {
        if (selectedSource === 'API') {
            return !pokemon.created;
        } else if (selectedSource === 'BD') {
            return pokemon.created;
        } else {
            return true;
        }
    })
    : filteredPokemonsByType;

  return (
    <div className={styles.CardContainer}>
      {filteredPokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CardContainer;




