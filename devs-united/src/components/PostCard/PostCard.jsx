import { FaFeather, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import Avatar3 from "../../assets/images/avatarRanger.png";


import "./PostCard.css";

export const PostCard = ({
  message,
  date,
  likes,
  id,
  erasePost,
  likePost,
  unLikePost,
  post,
  image,
  author
}) => {
  console.log(date);

  const day = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      {" "}
      <div className="post-cover">
        <div className="post-avatar">
          <img src={Avatar3} alt="avatar profile image" />
          {image && <img src={image} alt="post attach" />}
        </div>
        <div className="post-box font-face-fira">
          <div className="post-first-line">
            <div className="user-info-cover">
              <button className="font-face-silk username-clickable">
                {/* {author.displayName} */}
              </button>{" "}
              - {day}
            </div>
            <div className="erase" onClick={(event) => erasePost(id)}>
              <FaTrashAlt />
            </div>
          </div>
          <div>{message}</div>
          <div className="post-footer">
            <div className="post-footer-like">
              <FaHeart
                className="redHeart"
                onClick={() => likePost(post, author)}
              />
              <FaRegHeart onClick={(event) => unLikePost(post)} />
            </div>
            <div className="post-footer-likes">
              <span>{likes}</span>
            </div>
            <div className="erase">
              <FaFeather />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
