import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import Card from '../Card/Card';
import styles from './CardContainer.module.css';

const CardContainer = () => {
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.selectedType);
  const selectedSource = useSelector((state) => state.selectedSource);
  const sortingOrder = useSelector((state) => state.sortingOrder);
  const attackSortingOrder = useSelector((state) => state.attackSortingOrder);
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = 12; // Número de elementos por página
  const pokemons = useSelector((state) => state.pokemons);

  const applyFilters = (pokemons, selectedType, selectedSource) => {
    let filteredPokemons = pokemons;

    if (selectedType) {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.type.includes(selectedType)
      );
    }

    if (selectedSource === 'API') {
      filteredPokemons = filteredPokemons.filter((pokemon) => !pokemon.created);
    } else if (selectedSource === 'BD') {
      filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.created);
    }

    return filteredPokemons;
  };

  const applySorting = (pokemons, sortingOrder, attackSortingOrder) => {
    let sortedPokemons = [...pokemons];

    if (sortingOrder === 'asc') {
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortingOrder === 'desc') {
      sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (attackSortingOrder === 'asc') {
      sortedPokemons.sort((a, b) => a.attack - b.attack);
    } else if (attackSortingOrder === 'desc') {
      sortedPokemons.sort((a, b) => b.attack - a.attack);
    }

    return sortedPokemons;
  };

  const filteredPokemons = applyFilters(pokemons, selectedType, selectedSource);
  const sortedPokemons = applySorting(filteredPokemons, sortingOrder, attackSortingOrder);

  // Paginación
  const totalItems = sortedPokemons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemons = sortedPokemons.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    
    <div >
      <div className={styles.CardContainer}>
      {paginatedPokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
      </div>
      <div className={styles.Pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
        &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? styles.ActivePage : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        &gt;
        </button>
      </div>
    </div>
  );
};

export default CardContainer;









