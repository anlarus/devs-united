import "./LoggedIn.css";
import CreatePost from "../../components/Post/CreatePost";
import { PostCard } from "../../components/Post/PostCard/PostCard";
import firebase, { firestore, storage, auth, signOut } from "../../firebase";
import userEvent from "@testing-library/user-event";
import { useStyle } from "../../providers/StyleProvider";
import React, { useState, useEffect, useRef } from "react";
import { useUserAreaContext } from "../../providers/UserAreaProvider";

const LoggedIn = () => {
  const {
    style: { deviceClass },
  } = useStyle();
  const [author, setAuthor] = useUserAreaContext();
  const [postAuthor, setPostAuthor] = useState();
  const [file, setFile] = useState({});
  const [edit, setEdit] = useState(false);
  const [posts, setPosts] = useState([]);
  const likes = [];
  const [isLiked, setIsLiked] = useState(likes.includes(author));

  useEffect(() => {
    getPosts();
  }, []);

  //una vista adicional, textarea, update - message - new value//

  const getPosts = () => {
    const unsuscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        console.log(doc.data());

        console.log(doc.id);

        return {
          message: doc.data().message,
          author: doc.data().author,
          postID: doc.id,
          createdOn: doc.data().createdOn,
          isLiked: doc.data().isLiked || false,
          likes: doc.data().likes || [],
          imageURL: doc.data().imageURL || false,
        };
      });
      setPosts(posts);
    });

    return () => unsuscribe();
  };

  const getSuscribe = () => {
    auth.onAuthStateChanged((author) => {
      setAuthor(author);
    });
  };

  // const filterPosts = () => {  options tu filter posts
  //   firestore
  //     .collection("posts")
  //     //.limit(4)
  //     //.where('likes','>=',numberA)
  //     //.where('likes','<=',numberB)
  //     //.orderBy('likes','desc')
  //     //.startAt(numberA)
  //     //.endAt(numberB)

  const erasePost = (id) => {
    console.log("el id de post a eliminar es =>", id);
    firestore
      .collection(`posts`)
      .doc(id)
      .delete()
      .then((post) => {
        console.log("se elimino el post de referencia", post);
      })
      .catch((error) =>
        console.error(
          "some error has occured on deleting the post",
          error.message
        )
      );
  };

  const likePost = (post, author) => {
    const isInArray = post.likes.includes(author.uid);
    firestore
      .doc(`posts/${post.id}`)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(author.uid),
        // : likes: firebase.firestore.FieldValue.arrayUnion(author.uid)}
      })
      .then(() => {})
      .catch((error) =>
        console.error(
          "some error has occured on liking/disliking the post",
          error.message
        )
      );
  };

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setAuthor(null);
      console.log("the author is signed out");
    });
  };

  return (
    <div className="font-face-silk">
      <button className="reg-button-cover" onClick={signOut}>
        Sign Out
      </button>
      <main className="logged-in-main">
        <CreatePost setPostAuthor={setPostAuthor} getPosts={getPosts} />

        <section className="logged-in-section">
          {posts?.map((post) => {
            return (
              <PostCard
                key={post.postID}
                id={post.postID}
                message={post.message}
                createdOn={post.createdOn}
                likes={post.likes}
                erasePost={erasePost}
                likePost={likePost}
                setEdit={setEdit}
                edit={edit}
                post={post}
                imageURL={post.imageURL}
                author={author}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default LoggedIn;
