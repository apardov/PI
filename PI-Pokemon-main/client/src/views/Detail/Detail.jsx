import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css"; 
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetails);
  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div>
        <Navbar />
      <div className={styles.Detail}>
        <h1>Pokemon Details</h1>
        <h2>Name : {pokemonDetail.name}</h2>
        <img src={pokemonDetail.img} alt="pokemon" />
        <h3>ID: {pokemonDetail.id}</h3>
        <h3>HP: {pokemonDetail.hp}</h3>
        <h3>Attack: {pokemonDetail.attack}</h3>
        <h3>Defense: {pokemonDetail.defense}</h3>
        <h3>Speed: {pokemonDetail.speed}</h3>
        <h3>Height: {pokemonDetail.height}</h3>
        <h3>Weight: {pokemonDetail.weight}</h3>
        <h3>Types</h3>
        <ul>
            {pokemonDetail.type?.map((types, index) => (
            <li key={index}>{types}</li>
            ))}
        </ul>
    </div>
    </div>
      
  );
};

export default Detail;