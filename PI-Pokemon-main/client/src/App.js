
import { Home, Landing, Form, Detail } from "./views";
import { Route, Switch } from "react-router-dom";



function App() {
  return (
    <div className="App">
        <Switch>
        <Route exact path="/home" component={ Home } />
        <Route  path="/form" component={ Form } />
        <Route  path="/home/:id" component={ Detail } />
        <Route exact path="/" component={ Landing } />

        </Switch>
    </div>
  );
}

export default App;
