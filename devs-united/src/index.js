import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/silkscreen/slkscr.ttf";
import UserAreaContext from "./providers/UserAreaProvider";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <UserAreaContext>
          <App />
        </UserAreaContext>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
