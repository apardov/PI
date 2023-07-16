import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedType, getTypes, setFilteredPokemons } from '../../redux/actions';

const Filters = () => {
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.selectedType);
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    const filteredPokemons = selectedType
      ? pokemons.filter((pokemon) => pokemon.type.includes(selectedType))
      : [];

    dispatch(setFilteredPokemons(filteredPokemons));
    dispatch(setSelectedType(selectedType));
  };

  return (
    <div>
      <h1>Filters</h1>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;














