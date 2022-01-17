import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { Link, Redirect } from "react-router-dom";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import firebase, { auth, firestore } from "../../firebase";
import { GoogleLogin } from "react-google-login";
import { SignInInput } from "../../components/UserInput/UserInput";
import { useUserAreaContext } from "../../providers/UserAreaProvider";
import { signInWithGoogle, signOut, storage } from "../../firebase";


const SignIn = () => {
  const [author, setAuthor] = useUserAreaContext();
  const [body, setBody] = useState();

  const signInWithGoogle = (response) => {
    const { displayName, email, uid } = response.profileObj;
    setAuthor({ displayName, email, uid });
  };

  const handleInput = (event) => {
    setBody({ ...body, [event.target.name]: event.target.value });
  };

  const signIn = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(body.email, body.password)
      .then((authorCredential) => {
        console.log("sign in success", authorCredential.user);
        const { displayName, email, uid } = authorCredential.user;
        setAuthor({ displayName, email, uid });
        return <Redirect to="/loggedin" />;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <main>
      <form className="font-face-silk" onSubmit={signIn}>
        <DevsBigLogo />

        {author && (
          <h1>
            welcome <span>{author.displayName}</span>
          </h1>
        )}
        <SignInInput handleInput={handleInput} />

        <input
          type="submit"
          className="reg-button-cover"
          value="Sign in"
          onSubmit={signIn}
        />

        <GoogleLogin
          clientId="141550570435-721ct27r4e9u6ifl7heom8cm8dr4r4h9.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="button-cover">
              <div className="google-logo-cover">
                <img
                  className="google-icon-svg"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <button
                className="google-button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google login
              </button>
            </div>
          )}
          onSuccess={signInWithGoogle}
          onFailure={signInWithGoogle}
          cookiePolicy={"single_host_origin"}
        />

      </form>
    </main>
  );
};

export default SignIn;
