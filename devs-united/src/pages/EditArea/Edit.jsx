import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSdCard } from "react-icons/fa";
import firebase, { firestore, storage, auth, signOut } from "../../firebase";
import Avatar from "../../assets/images/Girl&Skateboard.png";
import { useEditAreaContext } from "../../providers/EditAreaProvider";

export const Edit = () => {

  //const { id } = useParams();
  const [setEdit, post, id, edittedMessage, setEdittedMessage] = useEditAreaContext();

 
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
        // setEdit(!edit);
      })
      .catch((err) =>
        console.error("error during editting the post", err.message)
      );
  };



  const handleMessage = (e) => {
    setEdittedMessage(e.target.value);
  };


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

            </div>
          </div>
          <div>
            <input
              type="text"
              value={edittedMessage}
              onChange={handleMessage}
            />
          </div>

        </div>
        <div className="erase" onClick={() => editPost(id)}>
          <FaSdCard />
        </div>
      </div>
    </>
  );
};
