import React, { createContext, useContext, useState, useEffect } from "react";
import { firestore, storage } from "../firebase";

const Context = createContext();

export const useEditAreaContext = () => {
  return useContext(Context);
};

const EditAreaContext = ({ children }) => {
  const [edit, setEdit] = useState(false);
  const [edittedMessage, setEdittedMessage] = useState("");

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

  return (
    <Context.Provider
      value={[edit, setEdit, post, id, edittedMessage, setEdittedMessage]}
    >
      {children}
    </Context.Provider>
  );
};

export default EditAreaContext;
