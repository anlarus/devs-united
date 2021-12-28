import React from "react";
import "./LoggedIn.css";
import LogoNavBar from "../../assets/images/LogoNavBar.jpg";
import Avatar from "../../assets/images/avatarMusic.png";
import TM from "../../assets/images/TM.jpg";
import Header from "../../components/Header/Header";
import { UserFile, UserMessage } from "../../components/UserInput/UserInput";
import { PostCard } from "../../components/PostCard/PostCard";

const LoggedIn = () => {
  return (
    <>
      <div className="font-face-silk">
        <main>
          <form>
            <div className="message-cover">
              <div className="message-box-left">
                <img src={Avatar} alt="avatar profile image" />
              </div>
              <div className="message-box-right">
                <UserMessage />
              </div>
            </div>

            <UserFile />
            <input className="font-face-silk" type="submit" value="post" />
            <progress
              className="upload-progress"
              max="100"
              value="10"
            ></progress>
          </form>

          <section>
            <PostCard />
          </section>

          <p className="font-face-fira tradeMark">
            © 2021 Devs_United - <span>BETA</span>
          </p>
          <div className="footer-underline"></div>
        </main>
      </div>
    </>
  );
};

export default LoggedIn;
