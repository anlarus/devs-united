import React from "react";
import "./Header.css";
import LogoNavBar from "../../assets/images/LogoNavBar.jpg";
import Avatar from "../../assets/images/avatarMusic.png";
import TM from "../../assets/images/TM.jpg";
import {
  useUserAreaContext,
} from "../../providers/UserAreaProvider";
import { auth } from "../../firebase";
const Header = () => {
  const [author, setAuthor, reg, setReg] = useUserAreaContext();

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setAuthor(null);
      console.log("the author is signed out");
      setReg(!reg)
    });
  };

  return (
    <header>
      <div className="small-avatar-box">
        <img src={author?.avatar || Avatar} alt="avatar of author" />
      </div>

      
        <span className="font-face-silk">{`Welcome ${
          author.displayName ? author.displayName : "Anonimous"
        }`}</span>
      
      <div className="header-img-container">
        <img src={LogoNavBar} alt="mini devsUnited image" />
      </div>
      <div className="header-img-container">
        <img src={TM} alt="devs united name" />
      </div>
     
    
        <button className="font-face-silk sign-out" onClick={signOut}>
          Sign out
        </button>
      
    </header>
  );
};

export default Header;
