//importaciones varias
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Form.module.css";

// Componente Form
const Form = () => {

  const [pokemonForm, setPokemonForm] = useState({ // estado inicial del formulario
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

  const [errors, setErrors] = useState({ // estado inicial de los errores
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

  const [typeOptions, setTypeOptions] = useState([]); // estado inicial de types de pokemon
  const [submitEnabled, setSubmitEnabled] = useState(false); // estado inicial del botón de submit

  useEffect(() => { // hook de react para ejecutar código cuando se monta el componente
    axios.get("http://localhost:3001/pokemons/types")   // petición get a la ruta /pokemons/types para obtener todos los types de pokemon
      .then((response) => {
        setTypeOptions(response.data.map((type) => type.name)); // guardamos los types de pokemon en el estado typeOptions
      })
      .catch(() => {
        alert("Error retrieving types");
      });
  }, []); 

  useEffect(() => { // hook de react para ejecutar código cuando se actualiza el estado pokemonForm
    validate(pokemonForm); // validamos el formulario cada vez que se actualiza el estado pokemonForm
  }, [pokemonForm]);

  useEffect(() => { // hook de react para ejecutar código cuando se actualiza el estado errors
    const hasErrors = Object.values(errors).some((error) => error !== ""); // validamos si hay errores
    setSubmitEnabled(!hasErrors && Object.values(pokemonForm).every(value => value !== '')); // habilitamos el botón de submit si no hay errores y todos los campos del formulario están completos
  }, [errors, pokemonForm]);

  const handleChange = (e) => { // función para manejar los cambios en el formulario
    setPokemonForm({ ...pokemonForm, [e.target.name]: e.target.value }); // actualizamos el estado pokemonForm con los valores ingresados en el formulario
  };

  const validate = (pokemonForm) => { // función para validar el formulario
    const compiledErrors = {};  // objeto para guardar los errores

    if (pokemonForm.name && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,15}$/.test(pokemonForm.name)) { // validamos el nombre del pokemon
      compiledErrors.name = "Please enter a valid name using only letters from A to Z (min 3 characters, max 15 characters)";
    }else {
      compiledErrors.name = "";
    }

    if (pokemonForm.img && !/\bhttps?:\/\/\S+\.(png|jpe?g)\b/.test(pokemonForm.img)) {  // validamos la url de la imagen del pokemon
      compiledErrors.img = "URL format is not valid";
    } else {
      compiledErrors.img = "";
    }

    if (pokemonForm.hp && !/^[0-9]{1,3}$/.test(pokemonForm.hp)) { // validamos los stats del pokemon
      compiledErrors.hp = "Please enter a valid number (Max 3 digits)";
    }else {
      compiledErrors.hp = "";
    }

    if (pokemonForm.attack && !/^[0-9]{1,3}$/.test(pokemonForm.attack)) { // validamos el campo attack del pokemon
      compiledErrors.attack = "Please enter a valid number (Max 3 digits)";
    }else {
      compiledErrors.attack = "";
    }

    if (pokemonForm.defense && !/^[0-9]{1,3}$/.test(pokemonForm.defense)) { // validamos el campo defense del pokemon
      compiledErrors.defense = "Please enter a valid number (Max 3 digits)";
    }else {
      compiledErrors.defense = "";
    }

    if (pokemonForm.speed && !/^[0-9]{1,3}$/.test(pokemonForm.speed)) { // validamos el campo speed del pokemon
      compiledErrors.speed = "Please enter a valid number (Max 3 digits)";
    } else{
      compiledErrors.speed = "";
    } 

    if (pokemonForm.height && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.height)) { // validamos el campo height del pokemon
      compiledErrors.height = "Please enter a valid number";
    } else {
      compiledErrors.height = "";
    }

    if (pokemonForm.weight && !/^(?:[0-9]{1,3}|[0-4]\d{2}|500)(?:\.\d{1,2})?$/.test(pokemonForm.weight)) { // validamos el campo weight del pokemon
      compiledErrors.weight = "Please enter a valid number";
    } else {
      compiledErrors.weight = "";
    }
    if (pokemonForm.types.length === 0) { // validamos que se haya seleccionado al menos un type de pokemon
      compiledErrors.types = "Please select at least one type";
    } else {
      compiledErrors.types = "";
    }

    setErrors(compiledErrors); // actualizamos el estado errors con los errores encontrados
  };

  const handleTypeChange = (e) => { // función para manejar los cambios en los types de pokemon
    const { name, checked } = e.target; // destructuramos el name y el checked del target del evento
    let selectedOptions = [...pokemonForm.types]; // creamos una copia del array de types de pokemon
  
    if (checked) { // si el type de pokemon está seleccionado lo agregamos al array de types de pokemon
      selectedOptions.push(name); 
    } else {
      selectedOptions = selectedOptions.filter((option) => option !== name); // si el type de pokemon no está seleccionado lo eliminamos del array de types de pokemon
    }
  
    setPokemonForm({ // actualizamos el estado pokemonForm con los types de pokemon seleccionados
      ...pokemonForm, 
      types: selectedOptions,
    });
  };  

  const handleSubmit = (e) => { // función para manejar el submit del formulario
    e.preventDefault(); // evitamos que se recargue la página
    if (submitEnabled && !errors.types) { // validamos que el botón de submit esté habilitado y que no haya errores en el campo types
      axios.post("http://localhost:3001/pokemons", pokemonForm) // hacemos un post a la ruta /pokemons con los datos del pokemon a crear
        .then(() => {
          alert("Pokemon created successfully");
        })
        .catch(() => {
          alert("Error creating pokemon");
        });
    }
  };

  return (
    <div>
      {/* mostramos el componente Navbar */}
      <Navbar />
      <div className={styles.FormContainer}>
        <h1>Create a Pokemon</h1>
        {/* componente en el cual ingresaremos los datos del pokemon a crear */}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          {/* ingresamos el nombre del pokemon */}
          <input
            type="text"
            name="name"
            value={pokemonForm.name}
            placeholder="Pokemon Name"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <label>Image</label>
          {/* ingresamos la url de la imagen del pokemon */}
          <input
            type="text"
            name="img"
            value={pokemonForm.img}
            placeholder="Pokemon URL Image"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.img && <span className={styles.error}>{errors.img}</span>}

          <label>HP</label>
          {/* ingresamos los hp del pokemon */}
          <input
            type="text"
            name="hp"
            value={pokemonForm.hp}
            placeholder="Pokemon HP"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.hp && <span className={styles.error}>{errors.hp}</span>}

          <label>Attack</label>
          {/* ingresamos el attack del pokemon */}
          <input
            type="text"
            name="attack"
            value={pokemonForm.attack}
            placeholder="Pokemon Attack"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.attack && <span className={styles.error}>{errors.attack}</span>}

          <label>Defense</label>
          {/* ingresamos el defense del pokemon */}
          <input
            type="text"
            name="defense"
            value={pokemonForm.defense}
            placeholder="Pokemon Defense"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.defense && <span className={styles.error}>{errors.defense}</span>}

          <label>Speed</label>
          {/* ingresamos el speed del pokemon */}
          <input
            type="text"
            name="speed"
            value={pokemonForm.speed}
            placeholder="Pokemon Speed"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.speed && <span className={styles.error}>{errors.speed}</span>}

          <label>Height</label>
          {/* ingresamos el height del pokemon */}
          <input
            type="text"
            name="height"
            value={pokemonForm.height}
            placeholder="Pokemon Height"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.height && <span className={styles.error}>{errors.height}</span>}

          <label>Weight</label>
          {/* ingresamos el weight del pokemon */}
          <input
            type="text"
            name="weight"
            value={pokemonForm.weight}
            placeholder="Pokemon Weight"
            onChange={handleChange}
          />
          {/* mostramos el error en caso de que exista */}
          {errors.weight && <span className={styles.error}>{errors.weight}</span>}

          <label>Pokemon Types</label>
          {/* mostramos los types de pokemon disponibles */}
          <div className={styles.checkboxContainer}>
            {typeOptions.map((type) => (
              <label key={type} className={styles.checkboxLabel}>
                {/* mostramos un checkbox por cada type de pokemon */}
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

          {/* validamos si el boton submit esta habilitado, en caso de ser asi se visualizara */}
          {submitEnabled ? (
            <button type="submit">Create Pokemon</button>
          ) : (
            <span>Please fill in all required fields correctly</span>
          )}
          {/* mostramos el error en caso de que exista */}
        </form>
      </div>
    </div>
  );
}

export default Form;

