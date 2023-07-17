import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getPokemonById } from "../../redux/actions";
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
        <h1>Pokemon Info</h1>
        <div className={styles.pokemonDetail}>
          <div className={styles.imageContainer}>
            <img src={pokemonDetail.img} alt="pokemon" />
          </div>
          <h2 className={styles.name}>Name: {pokemonDetail.name}</h2>
          <div className={styles.infoContainer}>
          <p className={styles.info}>ID : {pokemonDetail.id}</p>
          <p className={styles.info}>HP : {pokemonDetail.hp}</p>
          <p className={styles.info}>Attack : {pokemonDetail.attack}</p>
          <p className={styles.info}>Defense : {pokemonDetail.defense}</p>
          <p className={styles.info}>Speed : {pokemonDetail.speed}</p>
          <p className={styles.info}>Height : {pokemonDetail.height}</p>
          <p className={styles.info}>Weight : {pokemonDetail.weight}</p>
          <div className={styles.typesContainer}>
          <h2 className={styles.types}>Type :</h2>
          <ul>
            {pokemonDetail.type?.map((type, index) => (
              <li key={index}>
                {type}
              </li>
            ))}
          </ul>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;


