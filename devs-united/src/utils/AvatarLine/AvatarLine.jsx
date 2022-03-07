import React from "react";
import { useState } from "react";
import "./AvatarLine.css";
import { avatarsCollection } from "./avatars.js";

const AvatarLine = ({ setAvatar }) => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <p className="font-face-fira">Select your avatar image</p>

      <div className="avatar-cover">
        {avatarsCollection.map((avatar) => {
          return (
            <div key={avatar.id} className={`avatar-box`}>
              <img
                key={avatar.alt}
                alt={avatar.alt}
                src={avatar.url}
                onClick={(event) => {
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
