import { FaFeather, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import Avatar3 from "../../../assets/images/avatarGardener.png";
import "./PostCard.css";

export const PostCard = ({
  message,
  createdOn,
  updatedOn,
  likes,
  id,
  erasePost,
  likePost,
  post,
  author,
  isLiked,
  edit,
  setEdit,
}) => {
  console.log("post enter inside post card as=>", post);
  console.log("post COLOR enter inside post card as=>", post.authorColor);

  console.log("post ID en post card", id);

  console.log("image url en post card", post.imageURL);

  console.log("post created en post card", createdOn);

  console.log("author enter inside post card as=>", author);

  const postCreated = new Date(createdOn).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const postUpdated = new Date(updatedOn).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const editPost = (post) => {
    setEdit(!edit);
  };

  return (
    <>
      {" "}
      <div className="post-cover">
        <div className="post-avatar">
          <img src={post.avatar || Avatar3} alt="avatar profile image" />
          {post.imageURL && <img src={post.imageURL} alt="post attach" />}
        </div>
        <div className="post-box font-face-fira">
          <div className="post-first-line">
            <div className="user-info-cover">
              <button
                className={`font-face-silk username-clickable ${post.authorColor}`}
              >
                {post.authorName}
              </button>
              - {postCreated}
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
            {postUpdated && (
              <span className="user-info-cover"> - {postUpdated} </span>
            )}

            <div className="erase">
              <FaFeather />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
