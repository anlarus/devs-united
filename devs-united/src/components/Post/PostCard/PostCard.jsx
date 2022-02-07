import { FaFeather, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import Avatar3 from "../../../assets/images/avatarGardener.png";

import "./PostCard.css";

export const PostCard = ({
  message,
  createdOn,
  likes,
  id,
  erasePost,
  likePost,
  post,
  imageURL,
  author,
  isLiked,
  edit,
  setEdit,
}) => {

console.log("image url en post card", imageURL)

console.log("post ID en post card", id)

console.log("post created en post card", createdOn)

console.log("author enter inside post card as=>", author)


  const day = new Date(createdOn).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });



  const editPost = (post) => {
    setEdit(!edit);
    
  };

  return (
    <>
      {" "}
      <div className="post-cover">
        <div className="post-avatar">
          <img src={Avatar3} alt="avatar profile image" />
          {imageURL && <img src={imageURL} alt="post attach" />}
        </div>
        <div className="post-box font-face-fira">
          <div className="post-first-line">
            <div className="user-info-cover">
              <button className="font-face-silk username-clickable">
                {author.displayName}
              </button>
              - {day}
            </div>
            <div className="erase" onClick={(event) => erasePost(id)}>
              <FaTrashAlt />
            </div>
          </div>
          <div>{message}</div>
    
          <div className="post-footer">
            <div className="post-footer-like">
              {isLiked ? (
                <FaHeart
                  className="redHeart"
                  onClick={() => likePost(post, author)}
                />
              ) : (
                <FaRegHeart onClick={() => likePost(post, author)} />
              )}
            </div>
            <div className="post-footer-likes">
              <span>{likes.length}</span>
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
