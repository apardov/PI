import styles from './Card.module.css';
import {Link} from 'react-router-dom';

const Card = (props) => {
    const types = props.types.join(", ");

    return (
        <div className={styles.Card}>
           <Link to={`/home/${props.id}`} className={styles.link}>
           <div className={styles["img-container"]}>
                <img src={props.img} alt="Pokemon"/>
           </div>
           <p className={styles.name}>Name: {props.name}</p>
           <p className={styles.info}>Types: {types}</p>
           </Link>
        </div>
    )
}

export default Card;