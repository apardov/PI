// import varios 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// renderizado de componentes
ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}> {/* proveedor de componentes */}
    <BrowserRouter> {/* rutas de componentes */}
    <App /> {/* componente principal */}
    </BrowserRouter>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);



