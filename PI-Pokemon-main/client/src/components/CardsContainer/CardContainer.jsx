import Card from "../Card/Card";
import styles from "./CardContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemons } from "../../redux/actions";

const CardContainer = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);
    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    

    return (
        <div className={styles.CardContainer}>
           {pokemons?.map(pokemon => {
                return <Card 
                key={pokemon.id}
                id={pokemon.id}
                img={pokemon.img}
                name={pokemon.name}
                types={pokemon.type}
              />
           })}  
        </div>
    )
}

export default CardContainer;
