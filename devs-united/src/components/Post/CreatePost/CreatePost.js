import React, {   useState  } from "react";
import  { firestore, storage } from "../../../firebase";
import Avatar from "../../../assets/images/avatarMusic.png";
import "./CreatePost.css";
import { useUserAreaContext } from "../../../providers/UserAreaProvider";

const CreatePost = ({ getPosts }) => {
  const [post, setPost] = useState({
    message: "",
    author: "",
    imageURL: "",
    createdOn: "",
    updatedOn: "",
    likes: [],
  });
  const [author] = useUserAreaContext();
  const [image, setImage] = useState("");
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isUploaded, setIsUploaded] = useState(false);

  const handleOnchange = (event) => {
    let { name, value } = event.target;
    setPost((previousPostState) => ({
      ...previousPostState,
      author: author.uid,
      authorColor: author.authorColor,
      authorName: author.displayName,
      avatar: author.avatar || "https://3603f.csb.app/",
      imageURL: "",
      [name]: value,
    }));
  };

  const handleUploadImage = (event) => {
    addImage(event.target.files[0]);
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
        getPosts();
        setDone(!done);
      })
      .catch((err) => console.error(err.message))
      .finally(setProgress(0));
  };

  const addImage = (image) => {
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
          setImage(url);
          setIsUploaded(false);
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
              <img src={author?.avatar || Avatar} alt="avatar profile image" />
            </div>
            <div className="message-box-right">
              <textarea
                className="font-face-fira"
                name="message"
                placeholder="What´s happening?"
                maxLength="200"
                onChange={handleOnchange}
                value={!done ? post.message : ""}
              ></textarea>
              <progress max="200" value={post.message.length}></progress>
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
          <input
            className="font-face-silk"
            type="submit"
            value="post"
            disabled={isUploaded}
          />
        </form>
      </section>
    </>
  );
};

export default CreatePost;
