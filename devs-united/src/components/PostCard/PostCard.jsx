import on from "../../assets/images/on.png";
import off from "../../assets/images/off.png";
import Avatar from "../../assets/images/avatarMusic.png";
import "./PostCard.css"

export const PostCard = () => {
  return (
    <>
      {" "}
      <div className="post-separator"></div>
      <div className="post-cover">
        <div className="post-avatar">
          <img src={Avatar} alt="avatar profile image" />
        </div>
        <div className="post-box font-face-fira">
          <button className="font-face-silk username-clickable">username</button> - 5 jun.
          <div>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus consectetur quas voluptate possimus ad iusto nisi,
            esse facilis.
          </div>
          <div className="post-footer">
            <div className="post-footer-like">
              <img src={on} alt="mini devsUnited image" className="like"/>
              <img src={off} alt="mini devsUnited image"  className="dislike" />
            </div>
            <div className="post-footer-likes">
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
