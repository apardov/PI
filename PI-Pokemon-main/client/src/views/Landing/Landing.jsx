// importaciones de librerias
import { Link } from 'react-router-dom';

// Landing page
const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            {/* boton con link a home */}
            <button>
                <Link to="/home">Let's Go</Link>
            </button>
        </div>
    )
}

export default Landing;