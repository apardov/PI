import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.mainContainer}>
            <Link to="/home">Home</Link>
            <Link to="/form">Form</Link>
        </div>
    );
};

export default Navbar;