import React, { useState, useEffect } from "react";
import "./SignIn.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import ColorLine from "../../components/ColorLine/ColorLine.jsx";
import { auth, firestore } from "../../firebase";
import { useStyle } from "../../providers/StyleProvider";
import {
  UserNameInput,
  UserEmailInput,
  UserPasswordInput,
} from "../../components/UserInput/UserInput";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";

const SignIn = () => {
  return (
    <main className="sing-in-main">
      <form className="font-face-silk sign-in-form">
        <DevsBigLogo />
        <h1>
          welcome <span>name!</span>
        </h1>

        <ColorLine />

        <GoogleButton />

        <p className="font-face-fira">or sign in with your email</p>

        <UserNameInput value="Anna"/>
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
