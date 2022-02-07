import React, { createContext, useContext, useState, useEffect } from "react";
import firebase, { firestore, storage } from "../../firebase";
import Avatar from "../../assets/images/avatarMusic.png";
import "./CreatePost.css";
import { useUserAreaContext } from "../../providers/UserAreaProvider";

const CreatePost = ({ getPosts, setPostAuthor }) => {
  const [post, setPost] = useState({
    message: "",
    author: "",
    imageURL: "",
    createdOn: "",
    likes: [],
  });
  const [author] = useUserAreaContext();
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleOnchange = (event) => {
    let { name, value } = event.target;
    setPost((previousPostState) => ({
      ...previousPostState,
      author: author.uid,
      authorName: author.displayName,
      [name]: value,
    }));
  };

  const handleUploadImage = (event) => {
    addImage(event.target.files[0])
  };

  const createPost = (event) => {
    event.preventDefault();
    post.createdOn = Date.now();
    post.imageURL = image;
    firestore
      .collection(`posts`)
      .add(post)
      .then((postRef) => {
        console.log(`post sucess =>`, postRef);
        // addImage(post.image, postRef.id);
        getPosts();
      })
      .catch((err) => console.error(err.message));
  };

  const addImage = (image, postID) => {
    setIsUploaded(true);

    console.log("image comes as =>", image);
    const uploadTask = storage.ref().child(`/posts/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("image uploading error message", error.message);
      },

      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("URL of image is =>", url);
          setImage(url)
          setIsUploaded(false)

        });
      }
    );
  };

  return (
    <>
      <section className="logged-in-section">
        <form className="logged-in-form" onSubmit={createPost}>
          <div className="message-cover">
            <div className="message-box-left">
              <img src={Avatar} alt="avatar profile image" />
            </div>
            <div className="message-box-right">
              <textarea
                className="font-face-fira"
                name="message"
                placeholder="What´s happening?"
                maxLength="200"
                onChange={handleOnchange}
                value={post.message}
              ></textarea>
              <progress max="100" value={post.message.length}></progress>
              <div className="message-footer">
                <div className="message-footer-middle">
                  <span>{post.message.length}</span>
                </div>
                <div className="message-footer-middle">
                  <span>200 max.</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              className="font-face-silk post-input"
              type="file"
              title="Image"
              name="image"
              value={post.image?.name ?? ""}
              onChange={handleUploadImage}
            />
          </div>
          <progress
            className="upload-progress"
            max="100"
            value={progress}
          ></progress>
          <input className="font-face-silk" type="submit" value="post" disabled = {isUploaded}/>
        </form>
      </section>
    </>
  );
};

export default CreatePost;
