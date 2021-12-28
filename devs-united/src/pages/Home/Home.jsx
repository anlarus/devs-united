import React from "react";
import "./Home.css";
import { GoogleLogin } from "react-google-login";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";

import {Link} from "react-router-dom"

const Home = () => {
  return (
    <main>
      <div className="font-face-silk">
        <DevsBigLogo />
        <div className="button-box">
          <Link to="/signIn" className="sign-in button">Sign In</Link>
          <p>or</p>
          <Link to="/login" className="log-in button">Login</Link>
        </div>

        <h1>
          lorem
          <br />
          ipsum dolor
        </h1>
        <p className="font-face-fira">
          lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit
        </p>

        <p className="font-face-fira tradeMark">
          © 2021 Devs_United - <span>BETA</span>
        </p>
        <div className="footer-underline"></div>
      </div>
    </main>
  );
};

export default Home;
