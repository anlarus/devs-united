import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";

import UserInput from "../UserInput/UserInput";
import { auth, firestore } from "../../firebase";
import { GoogleLogin } from "react-google-login";
import {
  UserNameInput,
  UserEmailInput,
  UserPasswordInput,
} from "../UserInput/UserInput";


const Login = () => {
  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };

  return (
    <main>
      <form className="font-face-silk">

          <DevsBigLogo />

        <h1>
          welcome <span>name!</span>
        </h1>
        <UserNameInput />
        <UserPasswordInput />
        <input type="submit" className="reg-button-cover" value="Login me" />

        <GoogleLogin
          clientId="141550570435-721ct27r4e9u6ifl7heom8cm8dr4r4h9.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="button-cover">
              <div className="google-logo-cover">
                <img
                  class="google-icon-svg"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <button
                className="google-button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            </div>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
 
        <p className="font-face-fira tradeMark">
          © 2021 Devs_United - <span>BETA</span>
        </p>
        <div className="footer-underline"></div>
      </form>
    </main>
  );
};

export default Login;
