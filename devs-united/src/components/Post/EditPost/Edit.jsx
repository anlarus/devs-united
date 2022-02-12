import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSdCard } from "react-icons/fa";
import firebase, { firestore, storage, auth, signOut } from "../../../firebase";
import Avatar from "../../../assets/images/Girl&Skateboard.png";

export const Edit = ({ id, postCreated, postUpdated, editPost, handleMessage, post, edittedMessage }) => {

  //const { id } = useParams();
 

  return (
    <>
      <div className="post-cover">
        <div className="post-avatar">
          <img src={post.avatar || Avatar} alt="avatar profile image" />
          {post.imageURL && <img src={post.imageURL} alt="post attach" />}
        </div>
        <div className="post-box font-face-fira">
          <div className="post-first-line">
            <div className="user-info-cover">
              <button
                className={`font-face-silk username-clickable ${post?.authorColor}`}
              >
                {post?.authorName}
              </button>
              - {postCreated}
            </div>
          </div>
          <div>
            <input
              type="text"
              value={edittedMessage}
              onChange={handleMessage}
            />
          </div>
          <span>{postUpdated}</span>
        </div>
        <div className="erase" onClick={() => editPost(id)}>
          <FaSdCard />
        </div>
      </div>
    </>
  );
};
