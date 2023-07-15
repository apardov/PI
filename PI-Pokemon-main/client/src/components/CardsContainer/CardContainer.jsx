// Importaciones varias
import Card from "../Card/Card"; 
import styles from "./CardContainer.module.css"; 
import { useSelector, useDispatch } from "react-redux"; 
import { useEffect, useState } from "react"; 
import { getPokemons, getPokemonByName } from "../../redux/actions";

const CardContainer = () => {
  const dispatch = useDispatch(); // Inicializando la función de dispatch
  const allPokemons = useSelector((state) => state.pokemons); // Accediendo al estado "pokemons" de Redux
  const [currentPage, setCurrentPage] = useState(1); // Inicializando el estado de la página actual
  const [pokemonsPerPage] = useState(12); // Cantidad de pokemons por página
  const [search, setSearch] = useState(""); // Searchbar del estado de búsqueda
  const [notFound, setNotFound] = useState(false); // Inicializando estado de pokemon de no encontrado

  const handleChange = (e) => {
    setSearch(e.target.value); // Actualizando el estado de búsqueda según la entrada del usuario
    setNotFound(false); // Restableciendo el estado de no encontrado cuando cambia la entrada de búsqueda
  };

  const handleSubmit = (e) => { // Manejador de envío de formulario
    e.preventDefault();
    dispatch(getPokemonByName(search)); // Dispatch de la acción para obtener un Pokémon por nombre
    setSearch(""); // Limpiando la entrada de búsqueda después de enviar el formulario
  };

  useEffect(() => { // Hook para obtener todos los Pokémon
    dispatch(getPokemons()); // Dispatch de la acción para obtener todos los Pokémon cuando el componente se monta
  }, [dispatch]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage; // Calculando el índice del último Pokémon en la página actual
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // Calculando el índice del primer Pokémon en la página actual
  const currentPokemons = allPokemons.slice( // Extrayendo los Pokémon para la página actual
    indexOfFirstPokemon,
    indexOfLastPokemon
  ); 

  const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage); // Calculando el número total de páginas según la cantidad de Pokémon

  const handlePageChange = (pageNumber) => { // Manejador de cambio de página
    setCurrentPage(pageNumber); // Actualizando la página actual cuando el usuario hace clic en un número de página
  };

  useEffect(() => { // Hook para establecer el estado de no encontrado
    if (allPokemons.length === 0) { // Si no hay Pokémon en el estado de Redux
      setNotFound(true); // Estableciendo el estado de no encontrado en verdadero si no se encuentra ningún Pokémon
    }
  }, [allPokemons]); 

  return (
    <div>
      <div className={styles.SearchContainer}>
        { /* Searchbar para buscar Pokémon por nombre */}
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <input
            className={styles.SearchInput}
            type="search"
            placeholder="Search Pokémon"
            value={search}
            onChange={handleChange}
          />
          <button className={styles.SearchButton} type="submit">
            Search 
          </button>
        </form>
      </div>
      { /* Mensaje de error si no se encuentra ningún Pokémon */}
      {notFound && <p className={styles.NotFoundMessage}>Pokémon not found.</p>}   
      <div className={styles.CardContainer}>
        { /*Mapeando los Pokémon para mostrarlos en la página actual */}
        {currentPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            img={pokemon.img}
            name={pokemon.name}
            types={pokemon.type}
          />
        ))}
      </div>
        { /* Paginación */}
      <div className={styles.Pagination}>
        { /* Deshabilitar el botón de página anterior si la página actual es 1 */}
        <button
          className={styles.Page}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        { /* Mapeando los números de página */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={
                pageNumber === currentPage
                  ? styles.ActivePage
                  : styles.Page
              }
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
        { /* Deshabilitar el botón de página siguiente si la página actual es la última */}
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

export default CardContainer;

