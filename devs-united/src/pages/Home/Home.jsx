import React from "react";
import "./Home.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import { useStyle } from "../../providers/StyleProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    style: { deviceClass },
  } = useStyle();

  return (
    <main className={"font-face-silk"}>
      <div>
        <DevsBigLogo />
        <div className="button-box">
          <Link to="/signup" className="sign-in button">
            Sign Up
          </Link>
          <p>or</p>
          <Link to="/signin" className="log-in button">
            Sign In
          </Link>
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
      </div>
    </main>
  );
};

export default Home;
