import React, { useState } from "react";
import  { firestore } from "../../../firebase";
import { useUserAreaContext } from "../../../providers/UserAreaProvider";
import { FaCommentSlash, FaSave } from "react-icons/fa";
import "./CreateComment.css";

const CreateComment = ({
  getComments,
  commentOnPost,
  setCommentOnPost,
  id,
  post,
}) => {
  const [comment, setComment] = useState({
    message: "",
    author: "",
    createdOn: "",
    likes: [],
  });
  const [author] = useUserAreaContext();


  const handleOnchange = (event) => {
    let { name, value } = event.target;
    setComment((previousCommentState) => ({
      ...previousCommentState,
      author: author.uid,
      authorColor: author.authorColor,
      authorName: author.displayName,
      referenceToPost: id,
      [name]: value,
    }));
  };

  const createComment = (event) => {
    // event.preventDefault();
    comment.createdOn = Date.now();

    firestore
      .collection(`comments`)
      .add(comment)
      .then((commentRef) => {
        console.log(`comment sucess =>`, commentRef);
        setCommentOnPost(!commentOnPost)
        getComments();
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <div className="comment-cover">
        <div>
          <input
            type="text"
            className="font-face-fira comment-input"
            name="message"
            maxLength="100"
            onChange={handleOnchange}
            value={comment?.message}
          />
        </div>
        <progress max="100" value={comment?.message.length}></progress>
        <div className="message-footer">
          <span>{comment?.message.length}</span>
          <span> - 100 max.</span>
          <span className="erase" onClick={() => createComment(id)}>
            <FaSave />
          </span>
          <span
            className="erase"
            onClick={() => setCommentOnPost(!commentOnPost)}
          >
            <FaCommentSlash />
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateComment;
