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
        <div className="logo-box">
          <Link to="/register">
            <BigLogo />
          </Link>
        </div>
        <h1>welcome <span>name!</span></h1>
        <input className="font-face-fira reg-input" type="text" name="userName" id="userName" placeholder="Type your username"/>
        <p className="font-face-fira">Select your favorite color</p>
        <div className="color-cover">
          <div data-color="rgb(245,13,90)" className="color-box red"></div>
          <div data-color="rgb(255,134,92)" className="color-box orange"></div>
          <div data-color="rgb(255,234,92)" className="color-box yellow"></div>
          <div data-color="rgb(0,218,118)" className="color-box green"></div>
          <div data-color="rgb(0,150,206)" className="color-box blue"></div>
          <div data-color="rgb(128,15,255)" className="color-box violet"></div>
        </div>
        <div className="reg-button-cover">continue</div>
        <p className="font-face-fira tradeMark">
          © 2021 Devs_United - <span>BETA</span>
        </p>
        <div className="footer-underline"></div>
      </div>
    </main>
  );
};

export default Register;
