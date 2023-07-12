import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {

    return (
        <div className={styles.mainContainer}>
            <h1>Pokemon App</h1>
            <Link className={styles.link} to="/home">Home</Link>
            <Link className={styles.link} to="/form">Form</Link>
        </div>
    );
};

export default Navbar;