import { FaFeather, FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import Avatar3 from "../../../assets/images/avatarGardener.png";
import "./PostCard.css";
import { Edit } from "../EditPost/Edit";
import firebase, { firestore, storage, auth, signOut } from "../../../firebase";
import { useEffect, useState } from "react";

export const PostCard = ({
  message,
  createdOn,
  updatedOn,
  id,
  erasePost,
  likePost,
  post,
  author,
  isLiked,
  edit,
  setEdit,
}) => {
  const [edittedMessage, setEdittedMessage] = useState("");

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

  const editPost = () => {
    console.log("the editted message is =>", edittedMessage);

    firestore
      .collection("posts")
      .doc(id)
      .update({
        message: edittedMessage,
        updatedOn: Date.now(),
      })
      .then(() => {
        console.log("post modified successfully");
        setEdit(!edit);
      })
      .catch((err) =>
        console.error("error during editting the post", err.message)
      );
  };

  useEffect(() => {
    console.log("from edit post - it´s id", id);

    firestore
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        const post = snapshot.data();
        setEdittedMessage(post.message);
      })
      .catch((error) =>
        console.log(
          "some error has occured in setting a new post message",
          error.message
        )
      );
  }, [id]);

  const handleMessage = (e) => {
    setEdittedMessage(e.target.value);
  };

  if (edit) {
    return (
      <Edit
        id={id}
        postCreated={postCreated}
        postUpdated={postUpdated}
        setEdit={setEdit}
        edit={edit}
        handleMessage={handleMessage}
        post={post}
        editPost={editPost}
      />
    );
  }

  return (
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
            - created: {postCreated}
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
                onClick={() => likePost(id, author)}
              />
            ) : (
              <FaRegHeart onClick={() => likePost(id, author)} />
            )}
          </div>
          <div className="post-footer-likes">
            <span>{post.likes.length}</span>
          </div>
          {postUpdated && (
            <span className="user-info-cover"> - updated: {postUpdated} </span>
          )}

          <div className="erase">
            <FaFeather onClick={() => setEdit(!edit)} />
          </div>
        </div>
      </div>
    </div>
  );
};
