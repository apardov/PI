import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filters from "../../components/Filters/Filters";
import CardContainer from "../../components/CardsContainer/CardContainer";
import { getPokemons } from '../../redux/actions';
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
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