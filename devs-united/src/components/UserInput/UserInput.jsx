import React, { useState, useEffect } from "react";
import "./UserInput.css";
import { useStyle } from "../../providers/StyleProvider";

export const SignUpInput = ({ body, setBody }) => {

  const handleInput = (event) => {
    setBody({ ...body, [event.target.name]: event.target.value });
  };


  return (
    <>
      <input
        name="displayName"
        onChange={handleInput}
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
    </>
  );
};

export const SignInInput = ({ handleInput }) => {
  return (
    <>
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
    </>
  );
};

export const UserMessage = ({ value, onChange, edit, editPost, post }) => {
  const {
    style: { deviceClass },
  } = useStyle();
  const [message, setMessage] = useState("");
  let msgLenght = message.length;

  return (
    <>
      <textarea
        className="font-face-fira"
        name="message"
        placeholder="What´s happening?"
        maxLength="200"
        onChange={edit ? editPost : onChange}
        // value={edit ? value : "What´s happening?" }
      ></textarea>
      <progress max="100" value={msgLenght}></progress>
      <div className="message-footer">
        <div className="message-footer-middle">
          <span>{msgLenght}</span>
        </div>
        <div className="message-footer-middle">
          <span>200 max.</span>
        </div>
      </div>
    </>
  );
};

export const UserFile = ({ handleUpload }) => {
  return (
    <input
      className="font-face-silk post-input"
      type="file"
      title="Image"
      onChange={handleUpload}
    />
  );
};
