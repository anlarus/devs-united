import React, { useState, useEffect } from "react";
import "./UserInput.css";
import { auth, firestore } from "../../firebase";

export const UserNameInput = () => {
  return (
    <input
      type="text"
      className={`font-face-fira reg-input`}
      placeholder="type your user name"
    />
  );
};

export const UserEmailInput = () => {
  return (
    <input
      type="email"
      className={`font-face-fira reg-input`}
      placeholder="type your e-mail"
    />
  );
};

export const UserPasswordInput = () => {
  return (
    <input
      type="password"
      className={`font-face-fira reg-input`}
      placeholder="type your password"
    />
  );
};

export const UserMessage = () => {
  return (
    <>
      {" "}
      <textarea
        className="font-face-fira message"
        name="message"
        placeholder="  What´s happening?"
        maxlength="200"
      ></textarea>
      <progress max="100" value="17"></progress>
      <div className="message-footer">
        <div className="message-footer-middle">
          <span>17</span>
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
