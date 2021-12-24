import React from "react";
import "./LoggedIn.css";
import LogoNavBar from "../../assets/images/LogoNavBar.jpg";
import Avatar from "../../assets/images/avatarMusic.png";
import TM from "../../assets/images/TM.jpg";
import on from "../../assets/images/on.png";
import off from "../../assets/images/off.png";

const LoggedIn = () => {
  return (
    <>
      <div className="font-face-silk">
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
        </header>

        <main>
          <form>
            <div className="message-cover">
              <div className="message-box-left">
                <img src={Avatar} alt="avatar profile image" />
              </div>
              <div className="message-box-right">
                <textarea
                  className="font-face-fira message"
                  name="message"
                  placeholder="  What´s happening?"
                ></textarea>
                <progress max="100" value="17"></progress>
                <div className="message-footer">
                  <div className="message-footer-middle">
                    <span>17</span>
                  </div>
                  <div className="message-footer-middle">
                    <span>200 max.</span>
                  </div>
                </div>
              </div>
            </div>

            <input
              className="font-face-silk post-input"
              type="file"
              title="Image"
            />
            <input className="font-face-silk" type="submit" value="post" />
            <progress
              className="upload-progress"
              max="100"
              value="10"
            ></progress>
          </form>

          <section>
            <div className="message-cover">
              <div className="message-box-left">
                <img src={Avatar} alt="avatar profile image" />
              </div>
              <div className="message-box-right">
                <p className="font-face-fira">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Necessitatibus consectetur quas voluptate possimus ad iusto
                  nisi, esse facilis.
                </p>
                <div className="post-footer">
                  <div className="post-footer-middle">
                    <img src={on} alt="mini devsUnited image" />
                  </div>
                  <div className="post-footer-middle">
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
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
