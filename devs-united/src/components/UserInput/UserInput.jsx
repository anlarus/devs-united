import React, { useState, useEffect } from "react";
import "./UserInput.css";
import { auth, firestore } from "../../firebase";
import { useStyle } from "../../providers/StyleProvider";

export const UserNameInput = (props) => {
  const [userName, setUserName] = useState("");
  return (
    <input
      value={props.value}
      onChange={(event) => setUserName(event.target.value)}
      type="text"
      className={`font-face-fira reg-input`}
      placeholder="type your user name"
    />
  );
};

export const UserEmailInput = () => {
  const [userEmail, setUserEmail] = useState("");
  return (
    <input
      type="email"
      onChange={(event) => setUserEmail(event.target.value)}
      className={`font-face-fira reg-input`}
      placeholder="type your e-mail"
    />
  );
};

export const UserPasswordInput = () => {
  const [userPassword, setUserPassword] = useState("");

  return (
    <input
      type="password"
      onChange={(event) => setUserPassword(event.target.value)}
      className={`font-face-fira reg-input`}
      placeholder="type your password"
    />
  );
};

export const UserMessage = ({value, onChange}) => {
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
        placeholder="  What´s happening?"
        maxLength="200"
        onChange={onChange}
      >{value}</textarea>
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

export const UserFile = () => {
  return (
    <input className="font-face-silk post-input" type="file" title="Image" />
  );
};
