import React from "react";
import { useState } from "react";
import "./AvatarLine.css";
import { avatarsCollection } from "./avatars.js";

const AvatarLine = ({ setAvatar }) => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <p className="font-face-fira">Select your avatar image</p>

      <div className="color-cover">
        {avatarsCollection.map((avatar) => {
          return (
            <div key={avatar.id} className={`color-box`}>
              <img
                key={avatar.alt}
                alt={avatar.alt}
                src={avatar.url}
                onClick={(event) => {
                  console.log(event.target.src);
                  setCheck(true);
                  setAvatar(event.target.src);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AvatarLine;
