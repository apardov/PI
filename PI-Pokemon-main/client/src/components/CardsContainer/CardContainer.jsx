// Objetivo : Contenedor de Cards de los pokemons, con paginación y filtros

// Importaciones
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import Card from '../Card/Card';
import styles from './CardContainer.module.css';

const CardContainer = () => {
  const dispatch = useDispatch(); // permite despachar acciones al store
  const selectedType = useSelector((state) => state.selectedType); // guarda el estado de la store de selectedType
  const selectedSource = useSelector((state) => state.selectedSource); // guarda el estado de la store de selectedSource
  const sortingOrder = useSelector((state) => state.sortingOrder); // guarda el estado de la store de sortingOrder
  const attackSortingOrder = useSelector((state) => state.attackSortingOrder); // guarda el estado de la store de attackSortingOrder
  const currentPage = useSelector((state) => state.currentPage); // guarda el estado de la store de currentPage
  const itemsPerPage = 12; // Número de elementos por página 
  const pokemons = useSelector((state) => state.pokemons); // guarda el estado de la store de pokemons

  const applyFilters = (pokemons, selectedType, selectedSource) => { // función que aplica los filtros
    let filteredPokemons = pokemons; // guarda los pokemons en una variable

    if (selectedType) { // si hay un tipo seleccionado, filtra los pokemons por ese tipo
      filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.type.includes(selectedType) // pokemon.type.includes(selectedType) = si el tipo del pokemon incluye el tipo seleccionado
      );
    }

    if (selectedSource === 'API') { // si la fuente seleccionada es API, filtra los pokemons por los que no fueron creados por el usuario
      filteredPokemons = filteredPokemons.filter((pokemon) => !pokemon.created);  // !pokemon.created = pokemon.created === false, es decir, los que no fueron creados por el usuario
    } else if (selectedSource === 'BD') { // si la fuente seleccionada es BD, filtra los pokemons por los que fueron creados por el usuario
      filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.created); // pokemon.created = pokemon.created === true , es decir, los que fueron creados por el usuario
    }

    return filteredPokemons;  // retorna los pokemons filtrados
  };

  const applySorting = (pokemons, sortingOrder, attackSortingOrder) => { // función que aplica el ordenamiento
    let sortedPokemons = [...pokemons]; // guarda los pokemons en una variable con ... para no modificar el array original

    if (sortingOrder === 'asc') { // si el ordenamiento es ascendente, ordena los pokemons por nombre de forma ascendente
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name)); // a.name.localeCompare(b.name) = ordena los pokemons por nombre de forma ascendente A-Z (localeCompare = compara cadenas de texto)
    } else if (sortingOrder === 'desc') { // si el ordenamiento es descendente, ordena los pokemons por nombre de forma descendente
      sortedPokemons.sort((a, b) => b.name.localeCompare(a.name)); // b.name.localeCompare(a.name) = ordena los pokemons por nombre de forma descendente Z-A
    }

    if (attackSortingOrder === 'asc') { // si el ordenamiento es ascendente, ordena los pokemons por ataque de forma ascendente
      sortedPokemons.sort((a, b) => a.attack - b.attack); // a.attack - b.attack = ordena los pokemons por ataque de forma ascendente 0-100, si la comparación es negativa, a se ordena antes que b, si es positiva, b se ordena antes que a
    } else if (attackSortingOrder === 'desc') { // si el ordenamiento es descendente, ordena los pokemons por ataque de forma descendente
      sortedPokemons.sort((a, b) => b.attack - a.attack); // b.attack - a.attack = ordena los pokemons por ataque de forma descendente 100-0, si la comparación es negativa, b se ordena antes que a, si es positiva, a se ordena antes que b
    }

    return sortedPokemons; // retorna los pokemons ordenados
  };

  const filteredPokemons = applyFilters(pokemons, selectedType, selectedSource); // guarda los pokemons filtrados
  const sortedPokemons = applySorting(filteredPokemons, sortingOrder, attackSortingOrder); // guarda los pokemons ordenados

  // Paginación
  const totalItems = sortedPokemons.length;   // cantidad total de pokemons
  const totalPages = Math.ceil(totalItems / itemsPerPage); // cantidad total de páginas

  const startIndex = (currentPage - 1) * itemsPerPage; // índice de inicio de la página
  const endIndex = startIndex + itemsPerPage; // índice de fin de la página
  const paginatedPokemons = sortedPokemons.slice(startIndex, endIndex); // pokemons de la página actual

  const handlePageChange = (page) => { // función que cambia de página
    dispatch(setCurrentPage(page)); // cambia el estado de la store de currentPage
  };

  const handlePrevPage = () => { // función que va a la página anterior
    if (currentPage > 1) { // si la página actual es mayor a 1, va a la página anterior
      dispatch(setCurrentPage(currentPage - 1)); // cambia el estado de la store de currentPage
    }
  };

  const handleNextPage = () => { // función que va a la página siguiente
    if (currentPage < totalPages) { // si la página actual es menor a la cantidad total de páginas, va a la página siguiente
      dispatch(setCurrentPage(currentPage + 1)); // cambia el estado de la store de currentPage
    }
  };

  return (
    
    <div >
      <div className={styles.CardContainer}>
      {paginatedPokemons.map((pokemon) => (
        // Mapea los pokemons de la página actual y los muestra en Cards
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
      </div>
      <div className={styles.Pagination}>
        {/* Paginación */}
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
        &lt; {/* &lt; = < */}
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => ( 
          // crea un array de la cantidad de páginas y lo mapea, mostrando un botón por cada página, array.from = crea un array a partir de un objeto iterable, en este caso, un objeto con la cantidad de páginas
          <button
            key={page} // key = identificador único
            className={page === currentPage ? styles.ActivePage : ''} // si la página actual es igual a la página del botón, le agrega la clase ActivePage
            onClick={() => handlePageChange(page)} // al hacer click en el botón, cambia de página
          >
            {page} {/* muestra el número de página */}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}> {/* si la página actual es igual a la cantidad total de páginas, deshabilita el botón */}
        &gt; {/* &gt; = > */}
        </button>
      </div>
    </div>
  );
};

export default CardContainer;









