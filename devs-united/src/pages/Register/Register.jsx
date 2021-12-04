import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { ReactComponent as BigLogo } from "../../assets/images/bigLogo.svg";

const Register = () => {
  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };

  return (
    <main>
      <div  className="font-face-silk">
        <div>
          <Link to="/register">
            <BigLogo />
          </Link>
        </div>
        <h1>welcome <span>name!</span></h1>
        <input className="font-face-fira reg-input" type="text" name="userName" id="userName" placeholder="Type your username"/>
        <p className="font-face-fira">Select your favorite color</p>
        <div className="color-cover">
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
          <div className="color-box"></div>
        </div>
        <div className="reg-button-cover"><h3>continue</h3></div>
        <p className="font-face-fira">
          © 2021 Devs_United - <span>BETA</span>
        </p>
      </div>
    </main>
  );
};

export default Register;
