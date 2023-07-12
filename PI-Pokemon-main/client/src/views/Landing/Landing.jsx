import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            <button>
                <Link to="/home">Let's Go</Link>
            </button>
        </div>
    )
}

export default Landing;