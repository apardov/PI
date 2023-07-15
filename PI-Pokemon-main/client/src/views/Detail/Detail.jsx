// importaciones varias
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css"; 

// Componente Detail
const Detail = () => {
  const { id } = useParams(); // id del pokemon
  const dispatch = useDispatch(); // hook de redux para despachar acciones
  const pokemonDetail = useSelector((state) => state.pokemonDetails); // hook de redux para obtener el estado de pokemonDetails
      
      useEffect(() => { // hook de react para ejecutar código cuando se monta el componente
        dispatch(getPokemonById(id)); // despachamos la acción para obtener el pokemon por id
      }, [dispatch, id]);

  return (
    <div>
      {/* Renderizar Navbar */}
        <Navbar />
      <div className={styles.Detail}>
        {/* Renderizar los detalles del pokemon */}
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
            {/* Mapeamos los tipos del pokemon */}
            {pokemonDetail.type?.map((types, index) => (
            <li key={index}>{types}</li>
            ))}
        </ul>
    </div>
    </div>
      
  );
};

export default Detail;