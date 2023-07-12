import Card from "../Card/Card";
import styles from "./CardContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName } from "../../redux/actions";

const CardContainer = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const [search, setSearch] = useState("");
    const [notFound, setNotFound] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
        setNotFound(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(search));
        setSearch("");
    };

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (allPokemons.length === 0) {
            setNotFound(true);
        }
    }, [allPokemons]);

    return (
        <div>
            <div className={styles.SearchContainer}>
                <form className={styles.SearchForm} onSubmit={handleSubmit}>
                    <input
                        className={styles.SearchInput}
                        type="search"
                        placeholder="Pokemon Search"
                        value={search}
                        onChange={handleChange}
                    />
                    <button className={styles.SearchButton} type="submit">
                        Search
                    </button>
                </form>
            </div>
            {notFound && <p className={styles.NotFoundMessage}>Pokemon not found.</p>}
            <div className={styles.CardContainer}>
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
            <div className={styles.Pagination}>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={pageNumber === currentPage ? styles.ActivePage : styles.Page}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CardContainer;
