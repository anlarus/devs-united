import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { ReactComponent as BigLogo } from "../../assets/images/bigLogo.svg";

const Home = () => {
  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };

  return (
    <main>
      <div  className="font-face-silk">
        <div>
          <Link to="/">
            <BigLogo />
          </Link>
        </div>
        <h1>lorem ipsum dolor</h1>
        <p className="font-face-fira">lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <GoogleLogin
          clientId="141550570435-721ct27r4e9u6ifl7heom8cm8dr4r4h9.apps.googleusercontent.com"
          render={renderProps => (
            <div className="button-cover"><div className="google-logo-cover"><img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/></div><button className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</button></div>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <p className="font-face-fira">
          © 2021 Devs_United - <span>BETA</span>
        </p>
      </div>
    </main>
  );
};

export default Home;
