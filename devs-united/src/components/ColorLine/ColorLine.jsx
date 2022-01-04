import React from "react";
import { useState } from "react";
import "./ColorLine.css";
import { colorsCollection } from "../../utils/colors";

const ColorLine = () => {
  const [check, setCheck] = useState(false);
  const [userColor, setUserColor] = useState("");
  console.log(userColor);

  return (
    <>
      <p className="font-face-fira">Select your favorite color</p>

      <div className="color-cover">
        {colorsCollection.map((colorbox) => {
          return (
            <div
              onClick={(e) => {
                setCheck(true);
                setUserColor(e.target.backgroundColor);
                console.log(userColor);
              }}
              key={colorbox.id}
              className={`color-box ${colorbox.color}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ColorLine;
