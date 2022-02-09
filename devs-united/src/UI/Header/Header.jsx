import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import LogoNavBar from "../../assets/images/LogoNavBar.jpg";
import Avatar from "../../assets/images/avatarMusic.png";
import TM from "../../assets/images/TM.jpg";
import UserAreaContext, {
  useUserAreaContext,
} from "../../providers/UserAreaProvider";
import { auth } from "../../firebase";
const Header = () => {
  const [author, setAuthor] = useUserAreaContext();

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setAuthor(null);
      console.log("the author is signed out");
    });
  };

  return (
    <header>
      <div className="small-avatar-box">
        <img src={author?.avatar || Avatar} alt="avatar of author" />
      </div>

      {author && (
        <span className="font-face-silk">{`Welcome ${
          author.displayName ? author.displayName : "Anonimous"
        }`}</span>
      )}
      <div className="header-img-container">
        <img src={LogoNavBar} alt="mini devsUnited image" />
      </div>
      <div className="header-img-container">
        <img src={TM} alt="devs united name" />
      </div>
      <Navbar />
      {author && (
        <button className="font-face-fira sign-out" onClick={signOut}>
          Sign out
        </button>
      )}
    </header>
  );
};

export default Header;
