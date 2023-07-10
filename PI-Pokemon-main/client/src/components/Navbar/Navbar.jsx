import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.mainContainer}>
            <h1>Pokemon App</h1>
            <form action="">
                <input type="text" placeholder="Search Pokemon"/>
                <button>Search</button>
            </form>
            <Link to="/home">Home</Link>
            <Link to="/form">Form</Link>
        </div>
    );
};

export default Navbar;