// Objetivo : Mostrar el detalle de un pokemon en particular

// Dependencias
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getPokemonById } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams(); // se obtiene el id del pokemon desde la url
  const dispatch = useDispatch(); // se asigna la funcion usedispatch para ejecutar acciones de forma posterior
  const pokemonDetail = useSelector((state) => state.pokemonDetails); // se obtiene el estado del detalle del pokemon

  useEffect(() => { // se ejecuta al renderizar el componente
    window.scrollTo(0, 0); // al ingresar desde una pagina anterior, se posiciona en el top de la pagina
    dispatch(getPokemonById(id)); // se ejecuta la accion para obtener el detalle del pokemon
  }, [dispatch, id]); // se agrega el id como dependencia para que se ejecute la accion cada vez que cambie el id

  return (
    <div>
      <Navbar />
      <div className={styles.DetailContainer}>
        {/* Se muestra el detalle del pokemon con toda su informacion */}
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
            {pokemonDetail.type?.map((type, index) => ( // se mapean los tipos del pokemon
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


