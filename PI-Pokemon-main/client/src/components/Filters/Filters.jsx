// Objetivo de este componente: Filtrar los pokemons por tipo, BD o API, orden alfabético y orden de ataque

// Importaciones
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedType,
  getTypes,
  setSelectedSource,
  setSortingOrder,
  setAttackSortingOrder,
  setCurrentPage,
} from '../../redux/actions';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch(); // dispatch que me permitira ejecutar acciones 
  const selectedType = useSelector((state) => state.selectedType); // useSelector que me permitira acceder al estado de mi type seleccionado
  const types = useSelector((state) => state.types); // useSelector que me permitira acceder al estado de mis types
  const selectedSource = useSelector((state) => state.selectedSource); // useSelector que me permitira acceder al estado si pokemon es API o BD
  const sortingOrder = useSelector((state) => state.sortingOrder); // useSelector que me permitira acceder al estado y ordenar mis pokemon por nombre
  const attackSortingOrder = useSelector((state) => state.attackSortingOrder); // useSelector que me permitira acceder al estado y ordenar mis pokemon por ataque
  const currentPage = useSelector((state) => state.currentPage); // useSelector que me permitira acceder al estado de mi pagina actual

  useEffect(() => { // accion que me permitira obtener los tipos de pokemon desde el servidor
    dispatch(getTypes()); // Obtener los tipos de pokemon desde el servidor 
  }, [dispatch]); // array de dependencias que me permitira ejecutar la accion


  const handleTypeChange = (event) => { // Funcion que me permitira cambiar el tipo de pokemon
    const selectedType = event.target.value; // Obtener el tipo seleccionado
    dispatch(setSelectedType(selectedType)); // asignar el tipo seleccionado
    dispatch(setCurrentPage(1)); // Reiniciar la página al cambiar el tipo
  };

  const handleSourceChange = (event) => { // Funcion que me permitira cambiar si pokemon es de BD o API
    const selectedSource = event.target.value; // Obtener la fuente seleccionada
    dispatch(setSelectedSource(selectedSource)); // asignar la fuente seleccionada
    dispatch(setCurrentPage(1)); // Reiniciar la página al cambiar la fuente
  };

  const handleNameOrderChange = (event) => { // Funcion que me permitira cambiar el orden de los pokemon por nombre
    const sortingOrder = event.target.value; // Obtener el orden seleccionado A - Z o Z - A
    dispatch(setSortingOrder(sortingOrder)); // asignar el orden seleccionado
    dispatch(setCurrentPage(1)); // Reiniciar la página al cambiar el orden
  };

  const handleAttackOrderChange = (event) => { // Funcion que me permitira cambiar el orden de los pokemon por ataque
    const sortingOrder = event.target.value;  // Obtener el orden seleccionado Min - Max o Max - Min
    dispatch(setAttackSortingOrder(sortingOrder)); // asignar el orden seleccionado
    dispatch(setCurrentPage(1)); // Reiniciar la página al cambiar el orden de ataque
  };

  const handleResetFilters = () => { // Funcion que me permitira reiniciar los filtros
    dispatch(setSelectedType(''));
    dispatch(setSelectedSource(''));
    dispatch(setSortingOrder(''));
    dispatch(setAttackSortingOrder(''));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Filter by Type</h2>
        <select className={styles.select} value={selectedType} onChange={handleTypeChange}> 
        {/* select que me permitira seleccionar el tipo de pokemon */}
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Filter by Source</h2>
        <select className={styles.select} value={selectedSource} onChange={handleSourceChange}>
          {/* select que me permitira seleccionar si pokemon es de BD o API */}
          <option value="">All Sources</option>
          <option value="API">From API</option>
          <option value="BD">From BD</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Sort by Name</h2>
        <select className={styles.select} value={sortingOrder} onChange={handleNameOrderChange}>
          {/* select que me permitira seleccionar el orden de los pokemon por nombre */}
          <option value="">No Sorting</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z- A</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <h2 className={styles.title}>Sort by Attack</h2>
        <select className={styles.select} value={attackSortingOrder} onChange={handleAttackOrderChange}>
          {/* select que me permitira seleccionar el orden de los pokemon por ataque */}
          <option value="">No Sorting</option>
          <option value="asc">Min - Max</option>
          <option value="desc">Max - Min</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
      <span onClick={handleResetFilters} className={styles.reset}>Reset Filters</span>
      {/* span que me permitira reiniciar los filtros */}
      </div>
      <div className={styles.filterGroup}>
        <span className={styles.currentPage}>Current Page: {currentPage}</span>
        {/* span que me permitira mostrar la pagina actual */}
      </div>
    </div>
  );
};

export default Filters;







