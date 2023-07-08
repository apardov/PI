import Card from "../Card/Card";
import styles from "./CardContainer.module.css";
import { useSelector } from "react-redux";

const CardContainer = () => {

    const pokemons = useSelector(state => state.pokemons)
    return (
        <div className={styles.CardContainer}>
           {pokemons.map(pokemon => {
                return <Card 
                id = {pokemon.id}
                name = {pokemon.name}
                attack = {pokemon.attack}
                hp = {pokemon.hp}
              />
           })}  
        </div>
    )
}

export default CardContainer;