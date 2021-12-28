import React, { useState, useEffect } from "react";
import "./SignIn.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import ColorLine from "../ColorLine/ColorLine.jsx";
import { auth, firestore } from "../../firebase";
import { useStyle } from "../../providers/StyleProvider";
import {
  UserNameInput,
  UserEmailInput,
  UserPasswordInput,
} from "../UserInput/UserInput";
import { GoogleButton } from "../GoogleButton/GoogleButton";

const SignIn = () => {
  return (
    <main>
      <form className="font-face-silk">
        <DevsBigLogo />
        <h1>
          welcome <span>name!</span>
        </h1>

        <ColorLine />

        <GoogleButton />

        <p className="font-face-fira">or sign in with your email</p>

        <UserNameInput />
        <UserEmailInput />
        <UserPasswordInput />

        <input type="submit" className="reg-button-cover" value="Create user" />
        <p className="font-face-fira tradeMark">
          © 2021 Devs_United - <span>BETA</span>
        </p>
        <div className="footer-underline"></div>
      </form>
    </main>
  );
};

export default SignIn;
