import React, { useState, useEffect } from "react";
import "./UserInput.css";
import { useStyle } from "../../providers/StyleProvider";
import ColorLine from "../ColorLine/ColorLine";
import { GoogleButton } from "../GoogleButton/GoogleButton";
// import AvatarLine from "../../utils/AvatarLine/AvatarLine";

export const SignUpInput = ({
  body,
  setBody,
  setDisplayName,
  setAuthorColor,
  enter,
  handleUploadAvatar,
   avatar,
  signUp
}) => {
  const handleInput = (event) => {
    setBody({ ...body, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ColorLine setAuthorColor={setAuthorColor} />
      {/* <AvatarLine/> */}
      <GoogleButton enter={enter} />
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
        className="font-face-silk post-input"
        type="file"
        title="Image"
        name="photoURL"
        value={avatar}
        handleUpload={handleUploadAvatar}
      />
      <input
        type="submit"
        className="reg-button-cover"
        value="Sign up as an author"
        onSubmit={signUp}
      />
    </>
  );
};

export const SignInInput = ({ body, setBody, enter, signIn }) => {
  const handleInput = (event) => {
    let {name, value} = event.target;
    setBody({ ...body, [name]: value });
  };

  return (
    <>
      {" "}
      <GoogleButton enter={enter} />
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
