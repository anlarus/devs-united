import React from "react";
import "./UserInput.css";
import ColorLine from "../../utils/ColorLine/ColorLine";
import AvatarLine from "../../utils/AvatarLine/AvatarLine";

export const SignUpInput = ({
  body,
  setBody,
  setDisplayName,
  setAuthorColor,
  enter,
  setAvatar,
  signUp,
  signInWithGoogle,
}) => {
  const handleInput = (event) => {
    setBody({ ...body, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ColorLine setAuthorColor={setAuthorColor} />
      <AvatarLine setAvatar={setAvatar} />

      <div className="button-cover">
          <div className="google-logo-cover">
            <img
              className="google-icon-svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <button
            className="google-button"
            onClick={signInWithGoogle}
          >
            {`${enter} with Google`}
          </button>  
        </div>
 
      <p className="font-face-fira">or sign up with your email</p>
      <input
        name="displayName"
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        className={`font-face-fira reg-input`}
        placeholder="type your user name"
      />

      <input
        type="email"
        name="email"
        onChange={handleInput}
        className={`font-face-fira reg-input`}
        placeholder="type your e-mail"
      />

      <input
        type="text"
        name="password"
        onChange={handleInput}
        className={`font-face-fira reg-input`}
        placeholder="type your password"
      />

      <input
        type="submit"
        className="reg-button-cover"
        value="Sign up with your email"
        onSubmit={signUp}
      />
    </>
  );
};

export const SignInInput = ({
  body,
  setBody,
  enter,
  signIn,
  signInWithGoogle,
}) => {
  const handleInput = (event) => {
    let { name, value } = event.target;
    setBody({ ...body, [name]: value });
  };

  return (
    <>
      {" "}
      <div className="button-cover">
          <div className="google-logo-cover">
            <img
              className="google-icon-svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <button
            className="google-button"
            onClick={signInWithGoogle}
          >
            {`${enter} with Google`}
          </button>  
        </div>
      <p className="font-face-fira">or sign in with your email</p>
      <input
        type="email"
        name="email"
        onChange={handleInput}
        className={`font-face-fira reg-input`}
        placeholder="type your e-mail"
      />
      <input
        type="text"
        name="password"
        onChange={handleInput}
        className={`font-face-fira reg-input`}
        placeholder="type your password"
      />
      <input
        type="submit"
        className="reg-button-cover"
        value={enter}
        onSubmit={signIn}
      />
    </>
  );
};
