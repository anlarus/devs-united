import React, {useState, useEffect} from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { ReactComponent as BigLogo } from "../../assets/images/bigLogo.svg";
import {auth, firestore} from "../../firebase";
import swal from '@sweetalert/with-react';

const Register = () => {
   
  const [body, setBody] = useState({});

  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };

  const register = (e) => {
e.preventDefault();
let {email, password} = body;
auth.createUserWithEmailAndPassword(email, password)
.then((userCredential)=> {
  console.log(userCredential)
})
.catch((error)=>console.error("an error has occured here",error.message))
  }

  const handleInput = (e) => {
    setBody({...body, 
      [e.target.name]: e.target.value});
  }

  return (
    <main>
      <form  className="font-face-silk" onSubmit={register}>
        <div className="logo-box">
          <Link to="/register">
            <BigLogo />
          </Link>
        </div>
        <h1>welcome <span>name!</span></h1>
        <input onChange={handleInput} className="font-face-fira reg-input" type="text" name="name" id="userName" placeholder="Type your username"/>
        <input onChange={handleInput} className="font-face-fira reg-input" type="text" name="email" id="userEmail" placeholder="Type your username"/>
        <input onChange={handleInput} className="font-face-fira reg-input" type="text" name="password" id="userPassword" placeholder="Type your username"/>

        <p className="font-face-fira">Select your favorite color</p>
        <div className="color-cover">
          <div data-color="rgb(245,13,90)" className="color-box red"></div>
          <div data-color="rgb(255,134,92)" className="color-box orange"></div>
          <div data-color="rgb(255,234,92)" className="color-box yellow"></div>
          <div data-color="rgb(0,218,118)" className="color-box green"></div>
          <div data-color="rgb(0,150,206)" className="color-box blue"></div>
          <div data-color="rgb(128,15,255)" className="color-box violet"></div>
        </div>
        <input type="submit" className="reg-button-cover" value="Create user"/>
        <p className="font-face-fira tradeMark">
          © 2021 Devs_United - <span>BETA</span>
        </p>
        <div className="footer-underline"></div>
      </form>
    </main>
  );
};

export default Register;