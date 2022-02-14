import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import "./CommentCard.css"
import firebase, { firestore, storage, auth, signOut } from "../../../firebase";
import { useEffect, useState } from "react";

export const CommentCard = ({
  message,
  eraseComment,
  likeComment,
  comment,
  author,
  commentPost,
}) => {
  console.log("comment enters inside commentCard as=>", comment);

  const commentCreated = new Date(comment.createdOn).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="comment-box font-face-fira">
      <div className="comment-first-line">
        <div className="user-info-cover">
          <button
            className={`font-face-silk username-clickable-comment ${comment?.authorColor}`}
          >
            {comment?.authorName}
          </button>
          - created: {commentCreated}
        </div>
        {author.uid == comment.author && (
          <div
            className="erase"
            onClick={() => eraseComment(comment.commentID)}
          >
            <FaTrashAlt />
          </div>
        )}
      </div>
      <div>{message}</div>

      <div className="comment-footer">
        <div className="comment-footer-like">
          {comment.likes.includes(author.uid) ? (
            <FaHeart
              className="redHeart"
              onClick={() => likeComment(comment.commentID, author)}
            />
          ) : (
            <FaRegHeart
              onClick={() => likeComment(comment.commentID, author)}
            />
          )}
        </div>
        <div className="comment-footer-likes">
          <span>{comment.likes.length}</span>
   
        </div>
      </div>
    </div>
  );
};
