//Importaciones varias
import Navbar from "../../components/Navbar/Navbar";
import Sorting from "../../components/Sorting/Sorting";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filters from "../../components/Filters/Filters";
import Paginated from "../../components/Paginated/Paginated";

// Componente Home
const Home = () => {
//    
    return (
        <div>
            {/* componente Navbar */}
            <Navbar />
            {/* componente Searchbar */}
            <Searchbar />
            {/* componente Filters */}
            <Filters />
            {/* componente Sorting */}
            <Sorting />
            {/* componente Paginated */}
            <Paginated />
        </div>
    )
}

export default Home;