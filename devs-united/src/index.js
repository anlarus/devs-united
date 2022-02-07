import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/silkscreen/slkscr.ttf";
import StyleProvider from "./providers/StyleProvider";
import UserAreaContext from "./providers/UserAreaProvider";

ReactDOM.render(
  <React.StrictMode>
    <StyleProvider>
      <BrowserRouter>
        <UserAreaContext>
          <App />
        </UserAreaContext>
      </BrowserRouter>
    </StyleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
