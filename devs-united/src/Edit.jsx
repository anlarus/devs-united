import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import firebase, { firestore, storage, auth, signOut } from "./firebase";

export const Edit = () => {
  const [edittedMessage, setEdittedMessage] = useState("");
  const { id } = useParams();
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
      });
  }, [id]);

  const handleMessage = (e) => {
    setEdittedMessage(e.target.value);
  };

  const editPost = () => {
    console.log(edittedMessage);

    firestore
      .collection("posts")
      .doc(id)
      .update({
        message: edittedMessage,
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(console.log("post modified successfully"))
      .catch((err) =>
        console.error("error during editting the post", err.message)
      );
  };

  return (
    <>
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
              - {day}
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
        <div className="erase" onClick={()=>editPost(id)}>
          <FaSave />
        </div>
      </div>
    </>
  );
};
