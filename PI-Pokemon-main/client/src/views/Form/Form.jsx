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
    types: [],
  });

  const resetForm = () => {
    setPokemonForm({
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
    setErrors({
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
  };

  const [typeOptions, setTypeOptions] = useState([]);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/pokemons/types")
      .then((response) => {
        setTypeOptions(response.data.map((type) => type.name));
      })
      .catch(() => {
        alert("Error retrieving types");
      });
  }, []);

  useEffect(() => {
    validate(pokemonForm);
  }, [pokemonForm]);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setSubmitEnabled(!hasErrors && Object.values(pokemonForm).every(value => value !== ''));
  }, [errors, pokemonForm]);

  const handleChange = (e) => {
    setPokemonForm({ ...pokemonForm, [e.target.name]: e.target.value });
  };

  const validate = (pokemonForm) => {
    const compiledErrors = {};

    if (pokemonForm.name && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,15}$/.test(pokemonForm.name)) {
      compiledErrors.name = "Please enter a valid name using only letters from A to Z (min 3 characters, max 15 characters)";
    } else {
      compiledErrors.name = "";
    }

    if (pokemonForm.img && !/\bhttps?:\/\/\S+\.(png|jpe?g)\b/.test(pokemonForm.img)) {
      compiledErrors.img = "URL format is not valid";
    } else {
      compiledErrors.img = "";
    }

    if (pokemonForm.hp && !/^[0-9]{1,3}$/.test(pokemonForm.hp)) {
      compiledErrors.hp = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.hp = "";
    }

    if (pokemonForm.attack && !/^[0-9]{1,3}$/.test(pokemonForm.attack)) {
      compiledErrors.attack = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.attack = "";
    }

    if (pokemonForm.defense && !/^[0-9]{1,3}$/.test(pokemonForm.defense)) {
      compiledErrors.defense = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.defense = "";
    }

    if (pokemonForm.speed && !/^[0-9]{1,3}$/.test(pokemonForm.speed)) {
      compiledErrors.speed = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.speed = "";
    }

    if (pokemonForm.height && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.height)) {
      compiledErrors.height = "Please enter a valid number";
    } else {
      compiledErrors.height = "";
    }

    if (pokemonForm.weight && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.weight)) {
      compiledErrors.weight = "Please enter a valid number";
    } else {
      compiledErrors.weight = "";
    }

    if (pokemonForm.types.length === 0) {
      compiledErrors.types = "Please select at least one type";
    } else {
      compiledErrors.types = "";
    }

    setErrors(compiledErrors);
  };

  const handleTypeChange = (e) => {
    const { name, checked } = e.target;
    let selectedOptions = [...pokemonForm.types];

    if (checked) {
      selectedOptions.push(name);
    } else {
      selectedOptions = selectedOptions.filter((option) => option !== name);
    }

    setPokemonForm({
      ...pokemonForm,
      types: selectedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitEnabled && !errors.types) {
      axios.post("http://localhost:3001/pokemons", pokemonForm)
        .then(() => {
          setSuccess(true);
          resetForm();
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Create a Pokemon</h1>
      <div className={styles.FormContainer}>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={pokemonForm.name}
            placeholder="Pokemon Name"
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <label className={styles.label}>Image</label>
          <input
            type="text"
            name="img"
            value={pokemonForm.img}
            placeholder="Pokemon URL Image"
            onChange={handleChange}
          />
          {errors.img && <span className={styles.error}>{errors.img}</span>}

          <label className={styles.label}>HP</label>
          <input
            type="text"
            name="hp"
            value={pokemonForm.hp}
            placeholder="Pokemon HP"
            onChange={handleChange}
          />
          {errors.hp && <span className={styles.error}>{errors.hp}</span>}

          <label className={styles.label}>Attack</label>
          <input
            type="text"
            name="attack"
            value={pokemonForm.attack}
            placeholder="Pokemon Attack"
            onChange={handleChange}
          />
          {errors.attack && <span className={styles.error}>{errors.attack}</span>}

          <label className={styles.label}>Defense</label>
          <input
            type="text"
            name="defense"
            value={pokemonForm.defense}
            placeholder="Pokemon Defense"
            onChange={handleChange}
          />
          {errors.defense && <span className={styles.error}>{errors.defense}</span>}

          <label className={styles.label}>Speed</label>
          <input
            type="text"
            name="speed"
            value={pokemonForm.speed}
            placeholder="Pokemon Speed"
            onChange={handleChange}
          />
          {errors.speed && <span className={styles.error}>{errors.speed}</span>}

          <label className={styles.label}>Height</label>
          <input
            type="text"
            name="height"
            value={pokemonForm.height}
            placeholder="Pokemon Height"
            onChange={handleChange}
          />
          {errors.height && <span className={styles.error}>{errors.height}</span>}

          <label className={styles.label}>Weight</label>
          <input
            type="text"
            name="weight"
            value={pokemonForm.weight}
            placeholder="Pokemon Weight"
            onChange={handleChange}
          />
          {errors.weight && <span className={styles.error}>{errors.weight}</span>}

          <label className={styles.label}>Pokemon Types</label>
          <div className={styles.typesContainer}>
            {typeOptions.map((type) => (
              <label key={type} className={styles.types}>
                <input
                  type="checkbox"
                  name={type}
                  checked={pokemonForm.types.includes(type)}
                  onChange={handleTypeChange}
                />
                {type}
              </label>
            ))}
          </div>

          {submitEnabled ? (
            <button type="submit" className={styles.submitButton}>
              Create Pokemon
            </button>
          ) : (
            <span className={styles.error}>Please fill in all required fields correctly</span>
          )}

          {success && <span className={styles.success}>Pokemon created successfully!</span>}
        </form>
      </div>
    </div>
  );
}

export default Form;
