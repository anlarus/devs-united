import React from "react";
import "./Home.css"
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import {ReactComponent as BigLogo} from "../assets/images/bigLogo.svg";

const Home = () => {
  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };

  return (
   
      <main className="font-face-silk">
        <div></div>

        <Link to="/">
          <BigLogo/>
        </Link>
        <h1>lorem ipsum dolor</h1>
        <p>lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <GoogleLogin
          clientId="141550570435-721ct27r4e9u6ifl7heom8cm8dr4r4h9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </main>
    
  );
};

export default Home;
