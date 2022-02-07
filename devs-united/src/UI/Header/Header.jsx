import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import LogoNavBar from "../../assets/images/LogoNavBar.jpg";
import Avatar from "../../assets/images/avatarMusic.png";
import TM from "../../assets/images/TM.jpg";

const Header = () => {
  return (
    <header>
      <div className="small-avatar-box">
        <img src={Avatar} alt="avatar profile image" />
      </div>
      <div className="header-img-container">
        <img src={LogoNavBar} alt="mini devsUnited image" />
      </div>
      <div className="header-img-container">
        <img src={TM} alt="devs united name" />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
