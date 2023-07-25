// Objetivo : se muestra en caso de que no se encuentre la ruta

import Navbar from "../../components/Navbar/Navbar"

const NotFound = () => { // se muestra en caso de que no se encuentre la ruta

    return (
        <div>
            <Navbar />
            <h1>Not Found 404</h1>
        </div>
    )
}

export default NotFound;