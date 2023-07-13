import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Form.module.css";

const Form = () => {
  const [pokemonForm, setPokemonForm] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });


  const [errors, setErrors] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });

  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/pokemons/types")
      .then((response) => {
        setTypeOptions(response.data.map((type) => type.name));
      })
      .catch((error) => {
        alert("Error retrieving types");
      });
  }, []);

  const handleChange = (e) => {
    setPokemonForm({
      ...pokemonForm,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setPokemonForm({
      ...pokemonForm,
      types: selectedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/pokemons", pokemonForm)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.FormContainer}>
        <h1>Create a Pokemon</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={pokemonForm.name} placeholder="Pokemon Name" onChange={handleChange} />
          <label htmlFor="img">Image</label>
          <input type="text" name="img" id="img" value={pokemonForm.img} placeholder="Pokemon URL Image" onChange={handleChange} />
          <label htmlFor="hp">HP</label>
          <input type="number" name="hp" id="hp" value={pokemonForm.hp} placeholder="Pokemon HP" onChange={handleChange} />
          <label htmlFor="attack">Attack</label>
          <input type="number" name="attack" id="attack" value={pokemonForm.attack} placeholder="Pokemon Attack" onChange={handleChange} />
          <label htmlFor="defense">Defense</label>
          <input type="number" name="defense" id="defense" value={pokemonForm.defense} placeholder="Pokemon Defense" onChange={handleChange} />
          <label htmlFor="speed">Speed</label>
          <input type="number" name="speed" id="speed" value={pokemonForm.speed} placeholder="Pokemon Speed" onChange={handleChange} />
          <label htmlFor="height">Height</label>
          <input type="number" name="height" id="height" value={pokemonForm.height} placeholder="Pokemon Height" onChange={handleChange} />
          <label htmlFor="weight">Weight</label>
          <input type="number" name="weight" id="weight" value={pokemonForm.weight} placeholder="Pokemon Weight" onChange={handleChange} />
          <label htmlFor="types">Types</label>
          <select
            name="types"
            id="types"
            multiple
            value={pokemonForm.types}
            onChange={handleTypeChange}
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button type="submit">Create Pokemon</button>
        </form>
      </div>
    </div>
  );
}

export default Form;




