import styles from './Card.module.css';

const Card = (props) => {
    return (
        <div className={styles.Card}>
           <p>Name:{props.name}</p>
           <p>Attack:{props.attack}</p>
              <p>HP:{props.hp}</p>
        </div>
    )
}

export default Card;