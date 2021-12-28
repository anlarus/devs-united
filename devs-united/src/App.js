import "./App.css";
import { BrowserRouter as Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Header from "./components/Header/Header";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import Login from "./components/Login/Login";
import { firestore, storage, auth } from "./firebase";
import { useState, useEffect } from "react";

function App() {
 
  return (
    <div className="App">  

      <Header />

        <Route exact path="/">
          <Home />
        </Route>
        
        <Route exact path="/signIn">
          <SignIn />
        </Route>

        <Route exact path="/loggedIn">
          <LoggedIn />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
  
    </div>
  );
}

export default App;
