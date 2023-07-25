//Obejtivo : Vista principal de la aplicación, donde se renderizan los componentes Navbar, Searchbar, Filters y CardContainer

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filters from "../../components/Filters/Filters";
import CardContainer from "../../components/CardsContainer/CardContainer";
import { getPokemons } from '../../redux/actions';
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch(); // dispatch que me permitira ejecutar getPokemons 
  const allPokemons = useSelector((state) => state.pokemons); // useSelector que me permitira acceder al estado todos mis pokemons

  useEffect(() => { // accion que me permitira obtener los pokemons desde el servidor
    dispatch(getPokemons()); // Obtener los pokemons desde el servidor
  }, [dispatch]); 

  return (
    <div className={styles.Home}>
      <Navbar />
      <Searchbar />
      <Filters />
      <CardContainer pokemons={allPokemons} />
    </div>
  );
};

export default Home;