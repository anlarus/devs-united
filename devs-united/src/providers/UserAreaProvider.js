import React, { createContext, useContext, useState, useEffect } from "react";
import {
  firestore,
  storage,
  auth,
  signInWithGoogle,
  signOut,
} from "../firebase";

const Context = createContext();

export const useUserAreaContext = () => {
  return useContext(Context);
};

const UserAreaContext = ({ children }) => {
  const [reg, setReg] = useState(false);
  const [author, setAuthor] = useState();
  console.log("print author from context", author);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.id) {
        setAuthor(user);
      } else {
        //setAuthor(null);
      }
    });
  }, []);

  // const setAuthor = (author) => {
  //   localStorage.setItem("author", JSON.stringify(author));
  //   if (author == null) {
  //     localStorage.removeItem("author");
  //   }
  // };

  // const author = localStorage.getItem("author");

  return (
    <Context.Provider value={[author, setAuthor, reg, setReg]}>
      {children}
    </Context.Provider>
  );
};

export default UserAreaContext;
