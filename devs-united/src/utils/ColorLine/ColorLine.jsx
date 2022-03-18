import React from "react";
import { useState } from "react";
import "./ColorLine.css";
import { colorsCollection } from "../../utils/colors";

const ColorLine = ({setAuthorColor}) => {
  const [check, setCheck] = useState(false);
  const [focus, setFocus] = useState("")


  return (
    <>
      <p className="font-face-fira">Select your favorite color</p>

      <div className="color-cover">
        {colorsCollection.map((colorbox) => {
          return (
            <div
              onClick={(event) => {
                setCheck(true);
                setAuthorColor(colorbox.color);
                // setFocus("onFocus");
                // event.target.className = `onFocus`
              }}
              key={colorbox.color}
              checked = {check}
              className={`color-box ${colorbox.color} ${focus}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ColorLine;
