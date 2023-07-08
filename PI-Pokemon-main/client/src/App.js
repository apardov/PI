
import { Home, Landing, Form, Detail } from "./views";
import { Route, useLocation } from "react-router-dom";
import Navbar  from "./components/Navbar/Navbar";


function App() {
  const  location  = useLocation();
  return (
    <div className="App">
        {location.pathname !== "/" && <Navbar />}
        <Route exact path="/" component={Landing} />
        <Route path="/home" render={() => <Home />} />
        <Route exact path="/form" component={ Form } />
        <Route exact path="/detail" component={ Detail } />    
    </div>
  );
}

export default App;
