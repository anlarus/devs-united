import React from "react";
import { useState } from "react";
import "./ColorLine.css";
import { colorsCollection } from "../../utils/colors";

const ColorLine = ({userColor, setUserColor}) => {
  const [check, setCheck] = useState(false);


  return (
    <>
      <p className="font-face-fira">Select your favorite color</p>

      <div className="color-cover">
        {colorsCollection.map((colorbox) => {
          return (
            <div
              onClick={() => {
                setCheck(true);
                setUserColor(colorbox.color);
              }}
              key={colorbox.color}
              checked = {check}
              className={`color-box ${colorbox.color}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ColorLine;
