import "./App.css";
import { BrowserRouter as Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Header from "./components/Header/Header";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import SignIn from "./pages/SignIn/SignIn";
import {Tm} from "./components/TM/Tm"



function App() {


  

  return (
    <div className="App">  

      <Header />

        <Route exact path="/">
          <Home />
        </Route>
        
        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/loggedin">
          <LoggedIn />
        </Route>

        <Route exact path="/signin">
          <SignIn />
        </Route>

        <Tm />
      
    </div>
  );
}

export default App;
