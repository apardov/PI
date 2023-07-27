// import varios 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://pi-production-6b46.up.railway.app/';

// renderizado de componentes
ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}> {/* provider  */}
    <BrowserRouter> {/* rutas de componentes */}
    <App /> {/* componente principal */}
    </BrowserRouter>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);



