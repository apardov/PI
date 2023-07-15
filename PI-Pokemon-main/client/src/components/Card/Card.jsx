// Importaciones varias
import styles from './Card.module.css';
import {Link} from 'react-router-dom';

// Componente Card
const Card = (props) => {
    // Extrayendo los tipos de Pokémon
    const types = props.types.join(", ");

    return (
        <div className={styles.Card}>
            {/* Link a la ruta /home/id */}
           <Link to={`/home/${props.id}`} className={styles.link}>
           <div className={styles["img-container"]}>
                {/* Imagen del Pokémon */}
                <img src={props.img} alt="Pokemon"/>
           </div>
           {/* Nombre y tipos del Pokémon */}
           <p className={styles.name}>Name: {props.name}</p>
           <p className={styles.info}>Types: {types}</p>
           </Link>
        </div>
    )
}

export default Card;