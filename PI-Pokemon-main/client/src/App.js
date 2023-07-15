// importacion de componentes
import { Home, Landing, Form, Detail } from "./views";
import { Route, Switch } from "react-router-dom";


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
        </Switch>
    </div>
  );
}

export default App;
