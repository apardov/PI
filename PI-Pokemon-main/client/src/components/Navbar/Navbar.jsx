import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/img/pokemonHome.png"; // Importa la imagen del logo

// Componente Navbar
const Navbar = () => {
    return (
        <div className={styles.mainContainer}>
            <div>
                <Link className={styles.link} to="/home">Home</Link>
            </div>
            <div className={styles.logoContainer}>
                <img className={styles.logoImage} src={logo} alt="Pokemon Logo" />
            </div>
            <div>
                <Link className={styles.link} to="/form">Create Pokemon</Link>
            </div>
        </div>
    );
};

export default Navbar;
