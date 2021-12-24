import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/silkscreen/slkscr.ttf';
import ProtectedContext from "./context/Protected";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProtectedContext>
      <App />
      </ProtectedContext>
    </Router>
   
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
