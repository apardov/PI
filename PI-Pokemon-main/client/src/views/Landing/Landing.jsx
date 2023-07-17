import { Link } from 'react-router-dom';
import styles from './Landing.module.css';


const Landing = () => {
    return (
        <div className={styles.landingContainer}>
            {/* Botón con enlace a home */}
            <div className={styles.landingButton}>
                <Link to="/home" className={styles.landingText}>Let's Go</Link>
            </div>
        </div>
    )
}

export default Landing;
