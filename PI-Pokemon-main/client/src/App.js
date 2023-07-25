// importacion varias
import { Home, Landing, Form, Detail } from "./views";
import { Route, Switch } from "react-router-dom";
import NotFound from "../src/views/NotFound/NotFound";


// funcion principal
function App() {
  return (
    <div className="App">
        <Switch>
        { /* rutas y path hacia los componentes  */}
        <Route exact path="/home" component={ Home } />
        <Route  path="/form" component={ Form } />
        <Route  path="/home/:id" component={ Detail } />
        <Route exact path="/" component={ Landing } />
        <Route component={ NotFound } />
        </Switch>
    </div>
  );
}

export default App;
