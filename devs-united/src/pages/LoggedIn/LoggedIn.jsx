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
          authorName: doc.data().authorName,
          authorColor: doc.data().authorColor,
          avatar: doc.data().avatar,
          postID: doc.id,
          createdOn: doc.data().createdOn,
          updatedOn: doc.data().updatedOn,
          isLiked: doc.data().isLiked || false,
          likes: doc.data().likes || [],
          imageURL: doc.data().imageURL || false,
        };
      });
      setPosts(posts);
    });

    return () => unsuscribe();
  };

  // const getSuscribe = () => {
  //   auth.onAuthStateChanged((author) => {
  //     setAuthor(author);
  //   });
  // };

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
        console.log("se elimino el post de referencia");
      })
      .catch((error) =>
        console.error(
          "some error has occured on deleting the post",
          error.message
        )
      );
  };

  const likePost = (id) => {
    console.log("the liked post is =>", id);

    firestore
      .collection(`posts`)
      .doc(id)
      .get()
      .then(async (post) => {
        console.log("se trajo el post de referencia", post.data());
        updateLike(post, id, author);
      });
  };

  const updateLike = (post, id, author) => {
    const isInArray = post?.data().likes?.includes(author.uid);
    firestore
      .doc(`posts/${id}`)
      .update({
        ...(isInArray && {
          likes: firebase.firestore.FieldValue.arrayRemove(author.uid),
        }),
        ...(!isInArray && {
          likes: firebase.firestore.FieldValue.arrayUnion(author.uid),
        }),
      })
      .then(() => {
        console.log("the likes for this post has been successfully updated");
      })
      .catch((error) =>
        console.error(
          "some error has occured on liking/disliking the post",
          error.message
        )
      );
  };

  return (
    <div className="font-face-silk">
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
                updatedOn={post.updatedOn}
                likes={post.likes}
                erasePost={erasePost}
                likePost={likePost}
                setEdit={setEdit}
                edit={edit}
                post={post}
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
