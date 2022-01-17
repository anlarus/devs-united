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
  const [author, setAuthor] = useState(null);

  return (
    <Context.Provider value={[author, setAuthor ]}>
      {children}
    </Context.Provider>
  );
};

export default UserAreaContext;
