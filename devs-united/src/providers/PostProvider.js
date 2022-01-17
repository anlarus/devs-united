// import React, { createContext, useContext, useState, useEffect } from "react";
// import {
//   firestore,
//   storage,
//   auth,
//   signInWithGoogle,
//   signOut,
// } from "../firebase";

// const Context = createContext();

// export const usePostContext = () => {
//   return useContext(Context);
// };

// const PostContext = ({ children }) => {
//   const [posts, setPosts] = useState([]);
//   const [author, setAuthor] = useState(null);

//   useEffect(() => {
//     //    getPostsByLikesNumber();
//     const unsuscribe = firestore.collection("posts").onSnapshot((snapshot) => {
//       const posts = snapshot.docs.map((doc) => {
//         console.log(doc.data());
//         console.log(doc.data().date);

//         return {
//           message: doc.data().message,
//           author: doc.data().author,
//           id: doc.id,
//           date: doc.data().date,
//           likes: doc.data().likes || 0,
//           image: doc.data().image || false,
//         };
//       });
//       setPosts(posts);
//     });
//     auth.onAuthStateChanged((author) => {
//       console.log(author.uid)
//       setAuthor(author.uid);
//     });
//     return () => unsuscribe();
//   }, []);

//   return (
//     <Context.Provider value={[posts, setPosts]}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default PostContext;
