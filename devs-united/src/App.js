import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "./components/AppHeader"

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/">
          <AppHeader/>
          
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
