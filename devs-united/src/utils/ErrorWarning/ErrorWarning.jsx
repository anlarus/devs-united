import React from "react";
import { useStyle } from "../../providers/StyleProvider";

const ErrorWarning = () => {
  const {
    style: { deviceClass },
  } = useStyle();
  return (
    <div>
      <div>
        Some error has occured...
        <span>try again!</span>
      </div>
      <div className={`card ${deviceClass}`}>
        <img
          src="https://media3.giphy.com/media/l3vReH0vUdPOatiBa/giphy.gif?cid=ecf05e47xqnm03ynrydtckkv9rqfhhioccmz4kxo0jm5n6x0&rid=giphy.gif&ct=g"
          alt="some error occured"
        />
      </div>
    </div>
  );
};

export default ErrorWarning;
