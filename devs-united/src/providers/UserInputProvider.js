import React, { createContext, useContext, useState, useEffect } from "react";
import firebase, {
  firestore,
  storage,
} from "../firebase";


const UserInputContext = createContext();
export const useUserInput = () => useContext(UserInputContext);

const UserInputProvider = ({ children }) => {

  const [body, setBody] = useState({
    message: "",
    author: "",
  });
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);

  const handleOnchange = (event) => {
    let newPost = {
      ...body,
      [event.target.name]: event.target.value,
    };
    setBody(newPost);
  };

  const createPost = (event) => {
    event.preventDefault();
    const uploadTask = storage.ref().child(`/posts/${file.name}`).put(file);

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
        console.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          firestore
            .collection("posts")
            .add({ ...body, date: Date.now(), image: url })
            .then(() => console.log("image uploaded"))
            .catch((error) => {
              console.error(error.message);
            });
        });
      }
    );
  }

  const handleUploadImage = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <UserInputContext.Provider
      value={[
        handleOnchange,
        handleUploadImage,
        file,
        setFile,
        progress,
        setProgress,
        body,
        setBody,
        edit,
        setEdit,
        createPost
      ]}
    >
      {children}
    </UserInputContext.Provider>
  );
};

export default UserInputProvider;
