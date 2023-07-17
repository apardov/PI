import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
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
      <div className={styles.DetailContainer}>
        <h1>Pokemon Details</h1>
        <div className={`${styles.card} card`}>
          <div className="img-container">
            <img src={pokemonDetail.img} alt="pokemon" />
          </div>
          <h2 className="name">Name: {pokemonDetail.name}</h2>
          <p className="info">ID: {pokemonDetail.id}</p>
          <p className="info">HP: {pokemonDetail.hp}</p>
          <p className="info">Attack: {pokemonDetail.attack}</p>
          <p className="info">Defense: {pokemonDetail.defense}</p>
          <p className="info">Speed: {pokemonDetail.speed}</p>
          <p className="info">Height: {pokemonDetail.height}</p>
          <p className="info">Weight: {pokemonDetail.weight}</p>
          <h2 className="info">Types</h2>
          <ul>
            {pokemonDetail.type?.map((type, index) => (
              <li key={index} className="info">{type}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;

