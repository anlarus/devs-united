import on from "../../assets/images/on.png";
import off from "../../assets/images/off.png";
import erase from "../../assets/images/erase.png";
import { FaFeather, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";

import Avatar1 from "../../assets/images/avatarMusic.png";
import Avatar2 from "../../assets/images/avatarGardener.png";
import Avatar3 from "../../assets/images/avatarRanger.png";
import Avatar4 from "../../assets/images/avatarSportswoman.png";

import "./PostCard.css";

export const PostCard = ({
  author,
  message,
  date,
  likes,
  id,
  erasePost,
  editPost,
}) => {
  console.log(date);

  //  const {seconds, nanoseconds} = date;
  //  console.log(seconds, nanoseconds);
  // const day = new Date(seconds * 1000).toLocaleDateString( "en- ",
  // { month: "short", day: "numeric" }
  // );
  // console.log(day);

  //  let postDate = new Date(date.seconds * 1000 + date.nanoseconds/1000000).toLocaleDateString(
  //   "en-GB",
  //   { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  // );

  return (
    <>
      {" "}
      <div className="post-cover">
        <div className="post-avatar">
          <img src={Avatar3} alt="avatar profile image" />
        </div>
        <div className="post-box font-face-fira">
          <div className="post-first-line">
            <div className="user-info-cover">
              <button className="font-face-silk username-clickable">
                {author}
              </button>{" "}
              - 1 jan
            </div>
            <div className="erase" onClick={(event) => erasePost(id)}>
              <FaTrashAlt />
            </div>
          </div>
          <div>{message}</div>
          <div className="post-footer">
            <div className="post-footer-like">
              <FaHeart className = "redHeart"/>
              <FaRegHeart />
            </div>
            <div className="post-footer-likes">
              <span>{likes}</span>
            </div>
            <div className="erase" onClick={(event) => editPost(id)}>
              <FaFeather />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export const PostCard6 = () => {
  return (
    <>
      {" "}
      <div className="post-cover">
        <div className="post-avatar">
          <img src={Avatar2} alt="avatar profile image" />
        </div>
        <div className="post-box font-face-fira">
          <div className="post-first-line">
            <div className="user-info-cover">
              <button className="font-face-silk username-clickable">
                username
              </button>{" "}
              - 5 jun.
            </div>
            <div className="erase">
              <img src={erase} alt="erase" />
            </div>
          </div>
          <div>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Necessitatibus consectetur quas voluptate possimus ad iusto nisi,
            esse facilis.
          </div>
          <div className="post-footer">
            <div className="post-footer-like">
              <img src={on} alt="mini devsUnited image" className="like" />
              <img src={off} alt="mini devsUnited image" className="dislike" />
            </div>
            <div className="post-footer-likes">
              <span>008</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
