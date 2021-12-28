import React from "react";
import "./ColorLine.css";

const ColorLine = () => {
  return (
    <>
      <p className="font-face-fira">Select your favorite color</p>

      <div className="color-cover">
        <div data-color="rgb(245,13,90)" className="color-box red"></div>
        <div data-color="rgb(255,134,92)" className="color-box orange"></div>
        <div data-color="rgb(255,234,92)" className="color-box yellow"></div>
        <div data-color="rgb(0,218,118)" className="color-box green"></div>
        <div data-color="rgb(0,150,206)" className="color-box blue"></div>
        <div data-color="rgb(128,15,255)" className="color-box violet"></div>
      </div>
    </>
  );
};

export default ColorLine;
