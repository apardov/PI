import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedType,
  getTypes,
  setFilteredPokemonsByType,
  setSelectedSource,
  setFilteredPokemonsBySource,
} from '../../redux/actions';

const Filters = () => {
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.selectedType);
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const selectedSource = useSelector((state) => state.selectedSource);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    const filteredPokemons = selectedType
      ? pokemons.filter((pokemon) => pokemon.type.includes(selectedType))
      : [];

    dispatch(setFilteredPokemonsByType(filteredPokemons));
    dispatch(setSelectedType(selectedType));
  };

  const handleSourceChange = (event) => {
    const selectedSource = event.target.value;
    let filteredPokemons;

    if (selectedSource === 'API') {
      filteredPokemons = pokemons.filter((pokemon) => !pokemon.created);
    } else if (selectedSource === 'BD') {
      filteredPokemons = pokemons.filter((pokemon) => pokemon.created);
    } else {
      filteredPokemons = pokemons;
    }

    dispatch(setFilteredPokemonsBySource(filteredPokemons));
    dispatch(setSelectedSource(selectedSource));
  };

  return (
    <div>
      <h1>Filters</h1>
      <h2>Filter by Type</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <h2>Filter by Source</h2>
      <select value={selectedSource} onChange={handleSourceChange}>
        <option value="">All Sources</option>
        <option value="API">API</option>
        <option value="BD">BD</option>
      </select>
    </div>
  );
};

export default Filters;




