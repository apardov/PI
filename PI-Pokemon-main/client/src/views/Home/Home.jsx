import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../components/Navbar/Navbar";
import Sorting from "../../components/Sorting/Sorting";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filters from "../../components/Filters/Filters";
import CardContainer from "../../components/CardsContainer/CardContainer";
import Paginated from "../../components/Paginated/Paginated";
import { getPokemons } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Searchbar />
      <Filters />
      <Sorting />
      <CardContainer pokemons={allPokemons} />
      <Paginated />
    </div>
  );
};

export default Home;