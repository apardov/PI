import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Paginated.module.css';
import { getPokemons } from '../../redux/actions';
import CardContainer from '../CardsContainer/CardContainer';

const Paginated = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const selectedType = useSelector((state) => state.selectedType);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const totalPokemons = selectedType ? filteredPokemons.length : allPokemons.length;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let currentPokemons;
  if (selectedType) {
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  } else {
    currentPokemons = allPokemons.slice(
      (currentPage - 1) * pokemonsPerPage,
      currentPage * pokemonsPerPage
    );
  }

  return (
    <div>
      <CardContainer pokemons={currentPokemons} />
      <div className={styles.Pagination}>
        <button
          className={styles.Page}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? styles.ActivePage : styles.Page}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={styles.Page}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginated;



