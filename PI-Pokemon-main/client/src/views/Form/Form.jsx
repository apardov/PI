// Objetivo: Formulario para crear un nuevo pokemon

// Importaciones
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Form.module.css";

const Form = () => {
  const [pokemonForm, setPokemonForm] = useState({ // Estado inicial del formulario
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

  const [errors, setErrors] = useState({ // Estado inicial de los errores
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

  const [typeOptions, setTypeOptions] = useState([]); // Estado inicial pokemon types
  const [submitEnabled, setSubmitEnabled] = useState(false);  // Estado inicial del botón de submit
  const [success, setSuccess] = useState(false); // Estado inicial si pokemon se creó correctamente

  useEffect(() => { // Obtener los tipos de pokemon
    axios.get("http://localhost:3001/pokemons/types")
      .then((response) => {
        setTypeOptions(response.data.map((type) => type.name));
      })
      .catch(() => {
        alert("Error retrieving types");
      });
  }, []);

  useEffect(() => { // Validar el formulario
    validate(pokemonForm);
  }, [pokemonForm]); // array  que escucha los cambios en el formulario

  useEffect(() => { // Habilitar el botón de submit
    const hasErrors = Object.values(errors).some((error) => error !== ""); // Si hay errores, deshabilitar el botón de submit
    setSubmitEnabled(!hasErrors && Object.values(pokemonForm).every(value => value !== '')); // Si no hay errores y todos los campos están completos, habilitar el botón de submit
  }, [errors, pokemonForm]); // array  que escucha los cambios en los errores y el formulario

  const handleChange = (e) => { // Manejar los cambios en el formulario
    setPokemonForm({ ...pokemonForm, [e.target.name]: e.target.value }); // Actualizar el formulario con los nuevos valores
  };

  const validate = (pokemonForm) => {  // Validar el formulario
    const compiledErrors = {}; // Objeto que contendrá los errores

    if (pokemonForm.name && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,15}$/.test(pokemonForm.name)) { // Validar el nombre
      compiledErrors.name = "Please enter a valid name using only letters from A to Z (min 3 characters, max 15 characters)";
    } else {
      compiledErrors.name = "";
    }

    if (pokemonForm.img && !/\bhttps?:\/\/\S+\.(png|jpe?g)\b/.test(pokemonForm.img)) { // Validar la imagen
      compiledErrors.img = "URL format is not valid";
    } else {
      compiledErrors.img = "";
    }

    if (pokemonForm.hp && !/^[0-9]{1,3}$/.test(pokemonForm.hp)) { // Validar el HP
      compiledErrors.hp = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.hp = "";
    }

    if (pokemonForm.attack && !/^[0-9]{1,3}$/.test(pokemonForm.attack)) { // Validar el ataque
      compiledErrors.attack = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.attack = "";
    }

    if (pokemonForm.defense && !/^[0-9]{1,3}$/.test(pokemonForm.defense)) { // Validar la defensa
      compiledErrors.defense = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.defense = "";
    }

    if (pokemonForm.speed && !/^[0-9]{1,3}$/.test(pokemonForm.speed)) { // Validar la velocidad
      compiledErrors.speed = "Please enter a valid number (Max 3 digits)";
    } else {
      compiledErrors.speed = "";
    }

    if (pokemonForm.height && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.height)) { // Validar la altura
      compiledErrors.height = "Please enter a valid number";
    } else {
      compiledErrors.height = "";
    }

    if (pokemonForm.weight && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.weight)) { // Validar el peso
      compiledErrors.weight = "Please enter a valid number";
    } else {
      compiledErrors.weight = "";
    }

    if (pokemonForm.types.length === 0) { // Validar los tipos
      compiledErrors.types = "Please select at least one type";
    } else {
      compiledErrors.types = "";
    }

    setErrors(compiledErrors);  // Actualizar los errores
  };

  const handleTypeChange = (e) => { // Manejar los cambios en los tipos
    const { name, checked } = e.target;
    let selectedOptions = [...pokemonForm.types];

    if (checked) { // Si el tipo está seleccionado, agregarlo al array
      selectedOptions.push(name);
    } else {
      selectedOptions = selectedOptions.filter((option) => option !== name); // Si el tipo no está seleccionado, eliminarlo del array
    }

    setPokemonForm({ // Actualizar los tipos
      ...pokemonForm, // Mantener los valores anteriores
      types: selectedOptions, // Actualizar los tipos
    });
  };

  const handleSubmit = (e) => { // Manejar el submit del formulario
    e.preventDefault();
    if (submitEnabled && !errors.types) { // Si el submit está habilitado y no hay errores en los tipos, crear el pokemon
      axios.post("http://localhost:3001/pokemons", pokemonForm)
        .then(() => {
          setSuccess(true); // Si el pokemon se creó correctamente, mostrar mensaje de éxito
          resetForm(); // Reiniciar el formulario
        })
        .catch(() => {
          setSuccess(false); // Si el pokemon no se creó correctamente, mostrar mensaje de error
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
            placeholder=" Insert Pokemon Name"
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
          {/* Si hay errores en el nombre, mostrar mensaje de error */}

          <label className={styles.label}>Image</label>
          <input
            type="text"
            name="img"
            value={pokemonForm.img}
            placeholder="Insert Pokemon URL Image"
            onChange={handleChange}
          />
          {errors.img && <span className={styles.error}>{errors.img}</span>}
          {/* Si hay errores en la imagen, mostrar mensaje de error */}

          <label className={styles.label}>HP</label>
          <input
            type="text"
            name="hp"
            value={pokemonForm.hp}
            placeholder=" Insert Pokemon HP"
            onChange={handleChange}
          />
          {errors.hp && <span className={styles.error}>{errors.hp}</span>}
          {/* Si hay errores en el HP, mostrar mensaje de error */}

          <label className={styles.label}>Attack</label>
          <input
            type="text"
            name="attack"
            value={pokemonForm.attack}
            placeholder=" Insert Pokemon Attack"
            onChange={handleChange}
          />
          {errors.attack && <span className={styles.error}>{errors.attack}</span>}
          {/* Si hay errores en el ataque, mostrar mensaje de error */}

          <label className={styles.label}>Defense</label>
          <input
            type="text"
            name="defense"
            value={pokemonForm.defense}
            placeholder=" Insert Pokemon Defense"
            onChange={handleChange}
          />
          {errors.defense && <span className={styles.error}>{errors.defense}</span>}
          {/* Si hay errores en la defensa, mostrar mensaje de error */}

          <label className={styles.label}>Speed</label>
          <input
            type="text"
            name="speed"
            value={pokemonForm.speed}
            placeholder="Insert Pokemon Speed"
            onChange={handleChange}
          />
          {errors.speed && <span className={styles.error}>{errors.speed}</span>}
          {/* Si hay errores en la velocidad, mostrar mensaje de error */}

          <label className={styles.label}>Height</label>
          <input
            type="text"
            name="height"
            value={pokemonForm.height}
            placeholder=" Insert Pokemon Height"
            onChange={handleChange}
          />
          {errors.height && <span className={styles.error}>{errors.height}</span>}
          {/* Si hay errores en la altura, mostrar mensaje de error */}

          <label className={styles.label}>Weight</label>
          <input
            type="text"
            name="weight"
            value={pokemonForm.weight}
            placeholder=" Insert Pokemon Weight"
            onChange={handleChange}
          />
          {errors.weight && <span className={styles.error}>{errors.weight}</span>}
          {/* Si hay errores en el peso, mostrar mensaje de error */}

          <label className={styles.label}>Pokemon Types</label>
          <div className={styles.typesContainer}>
            {typeOptions.map((type) => (
              <label key={type} className={styles.types}>
                <input
                  type="checkbox"
                  name={type}
                  checked={pokemonForm.types.includes(type)} // Si el tipo está seleccionado, marcarlo
                  onChange={handleTypeChange}
                />
                {type} {/* Mostrar el tipo */}
              </label>
            ))}
            {errors.types && <span className={styles.error}>{errors.types}</span>}
            {/* Si hay errores en los tipos, mostrar mensaje de error */}
          </div>

          {submitEnabled ? ( // Si el submit está habilitado, mostrar el botón de submit
            <button type="submit" className={styles.submitButton}>
              Create Pokemon
            </button>
          ) : (
            <span className={styles.error}>Please fill in all required fields correctly</span> // Si el submit no está habilitado, mostrar mensaje de error
          )}

          {success && <span className={styles.success}>Pokemon created successfully!</span>} {/* Si el pokemon se creó correctamente, mostrar mensaje de éxito */}
        </form>
      </div>
    </div>
  );
}

export default Form;
