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

  return (
    <Context.Provider value={[author, setAuthor, reg, setReg]}>
      {children}
    </Context.Provider>
  );
};

export default UserAreaContext;
