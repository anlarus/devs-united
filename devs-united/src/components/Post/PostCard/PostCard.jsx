import {
  FaFeather,
  FaHeart,
  FaRegHeart,
  FaTrashAlt,
  FaCommentDots,
} from "react-icons/fa";
import Avatar3 from "../../../assets/images/avatarGardener.png";
import "./PostCard.css";
import { Edit } from "../EditPost/Edit";
import { firestore } from "../../../firebase";
import { useEffect, useState } from "react";
import { CommentCard } from "../CommentPost/CommentCard.jsx";
import CreateComment from "../CommentPost/CreateComment";
import SweetAlert from "react-bootstrap-sweetalert";

export const PostCard = ({
  message,
  createdOn,
  updatedOn,
  id,
  erasePost,
  likePost,
  post,
  author,
  commentPost,
  eraseComment,
  likeComment,
  comments,
  getComments,
}) => {
  const [edittedMessage, setEdittedMessage] = useState("");
  const [commentOnPost, setCommentOnPost] = useState(false);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState(null);

  const postCreated = new Date(createdOn).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const postUpdated = new Date(updatedOn).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const editPost = (id) => {
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

  const onEditHandler = (id) => {
    setEdit(!edit);
  };

  useEffect(() => {
    firestore
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot) => {
        const post = snapshot.data();
        setEdittedMessage(post.message);
      })
      .catch((error) =>
        console.error(
          "some error has occured in setting a new post message",
          error.message
        )
      );
  }, [id]);

  const handleMessage = (e) => {
    setEdittedMessage(e.target.value);
  };

  const handleAlert = (id) => {
    setAlert(id);
  };

  const onConfirm = (alert) => {
    erasePost(alert);
    setAlert(null);
  };

  const onCancel = () => {
    setAlert(null);
  };

  return (
    <>
      {alert && (
        <SweetAlert
          customClass="alertBox"
          title={"undoubtedly\n delete?"}
          onConfirm={() => onConfirm(alert)}
          onCancel={() => onCancel()}
          showCancel
        ></SweetAlert>
      )}

      <div className="post-wrapper">
        <div className="post-header">
          <div className="post-header-avatar">
            <img src={post.avatar || Avatar3} alt="author's avatar" />
          </div>

          <div className="post-header-box">
            {" "}
            <button
              className={`font-face-silk username-clickable ${post.authorColor}`}
            >
              {post.authorName}
            </button>
          </div>
          <div className="date-box">
            {" "}
            <span>- created: {postCreated}</span>
          </div>
          <div
            className="post-header-icon"
            onClick={() => setCommentOnPost(!commentOnPost)}
          >
            {!commentOnPost && <FaCommentDots />}
          </div>
        </div>

        <div className="post-box font-face-fira">
          <div className="post-first-line"></div>

          {edit ? (
            <Edit
              edit={edit}
              id={id}
              postCreated={postCreated}
              postUpdated={postUpdated}
              setEdit={setEdit}
              handleMessage={handleMessage}
              post={post}
              editPost={editPost}
              edittedMessage={edittedMessage}
            />
          ) : (
            <div className="post-message">{message}</div>
          )}
          {!edit && (
            <div className="post-footer">
              <div className="post-footer-like">
                {post.likes.includes(author.uid) ? (
                  <FaHeart
                    className="redHeart"
                    onClick={() => likePost(id, author)}
                  />
                ) : (
                  <FaRegHeart onClick={() => likePost(id, author)} />
                )}{" "}
                <span> {post.likes.length}</span>
              </div>

              {updatedOn && (
                <div className="updated"> - updated: {postUpdated} </div>
              )}

              {author.uid == post.author && !edit && (
                <div className="post-icon" onClick={() => onEditHandler(id)}>
                  <FaFeather />
                </div>
              )}

              {author.uid == post.author && (
                <div className="post-icon" onClick={() => handleAlert(id)}>
                  <FaTrashAlt />
                </div>
              )}
            </div>
          )}

          <div className="post-image-box">
            {post.imageURL && <img src={post.imageURL} alt="post attach" />}
          </div>
        </div>
        {commentOnPost && (
          <CreateComment
            id={id}
            post={post}
            commentOnPost={commentOnPost}
            getComments={getComments}
            setCommentOnPost={setCommentOnPost}
          />
        )}
        <div className="comments-collection">
          {comments?.map((comment) => {
            if (comment?.referenceToPost == id) {
              return (
                <CommentCard
                  key={comment.createdOn}
                  id={id}
                  message={comment.message}
                  createdOn={comment.createdOn}
                  likes={comment.likes}
                  referenceToPost={comment.referenceToPost}
                  eraseComment={eraseComment}
                  likeComment={likeComment}
                  comment={comment}
                  author={author}
                  commentPost={commentPost}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
