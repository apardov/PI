// importaciones varias
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

// Componente Navbar
const Navbar = () => {

    return (
        <div className={styles.mainContainer}>
            <h1>Pokemon App</h1>
            {/* Links a las rutas /home y /form */}
            <Link className={styles.link} to="/home">Home</Link>
            <Link className={styles.link} to="/form">Create Pokemon</Link>
        </div>
    );
};

export default Navbar;