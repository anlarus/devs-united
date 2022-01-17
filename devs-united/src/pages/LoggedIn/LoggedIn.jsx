import "./LoggedIn.css";
import Avatar from "../../assets/images/avatarMusic.png";
import { UserFile, UserMessage } from "../../components/UserInput/UserInput";
import { PostCard } from "../../components/PostCard/PostCard";
import firebase, { firestore, storage, auth, signOut } from "../../firebase";
import userEvent from "@testing-library/user-event";
import { useStyle } from "../../providers/StyleProvider";
import { useUserInput } from "../../providers/UserInputProvider";
import React, { useState, useEffect, useRef } from "react";
import { useUserAreaContext } from "../../providers/UserAreaProvider";

const LoggedIn = () => {
  const {
    style: { deviceClass },
  } = useStyle();
  // const [posts, setPosts] = useState([]);
  // const [body, setBody] = useState({
  //   message: "",
  //   author: "",
  // });

  const [
    handleOnchange,
    file,
    setFile,
    progress,
    setProgress,
    body,
    setBody,
    edit,
    setEdit,
    createPost,
  ] = useUserInput();

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = [];
  const [author, setAuthor] = useUserAreaContext();

  useEffect(() => {
    //    getPostsByLikesNumber();
    const unsuscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        console.log(doc.data());

        return {
          message: doc.data().message,
          author: doc.data().author,
          id: doc.id,
          date: doc.data().date,
          likes: doc.data().likes || [],
          image: doc.data().image || false,
        };
      });
      setPosts(posts);
    });
    auth.onAuthStateChanged((author) => {
      setAuthor(author.uid);
    });
    return () => unsuscribe();
  }, []);

  console.log(author);

  console.log("posts come as", posts);

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
    firestore
      .collection(`posts`)
      .doc(id)
      .delete()
      .then(() => {})
      .catch((error) => console.error("some error has occured on deleting the post", error.message));
  };



  const likePost = (post, author) => {
    firestore
      .doc(`posts/${post.id}`)
      .update({
        likes: [...post.likes, author],
      })
      .then(() => {})
      .catch((error) =>
        console.error(
          "some error has occured on liking the post",
          error.message
        )
      );
  };

  const unLikePost = (post) => {
    firestore
      .doc(`posts/${post.id}`)
      .update({
        likes: post.likes < 1 ? post.likes : post.likes - 1,
      })
      .then(() => {})
      .catch((error) =>
        console.error(
          "some error has occured on unliking the post",
          error.message
        )
      );
  };

  const editPost = (post) => {
    setEdit(!edit);
    edit ? setBody(post) : setBody({});
  };

 

  return (
    <div className="font-face-silk">
      <input
        type="submit"
        className="reg-button-cover"
        value="Sign Out"
        onSubmit={signOut}
      />
      <main className="logged-in-main">
        <form className="logged-in-form" onSubmit={createPost}>
          <div className="message-cover">
            <div className="message-box-left">
              <img src={Avatar} alt="avatar profile image" />
            </div>
            <div className="message-box-right">
              <UserMessage
                value={body.message}
                onChange={handleOnchange}
                edit={edit}
              />
            </div>
          </div>
          <div>
            <UserFile handleUpload={handleUploadImage} />
            <input className="font-face-silk" type="submit" value="post" />
          </div>
          <progress
            className="upload-progress"
            max="100"
            value={progress}
          ></progress>
        </form>

        <section className="logged-in-section">
          {posts?.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                message={post.message}
                date={post.date}
                likes={post.likes}
                erasePost={erasePost}
                likePost={likePost}
                unLikePost={unLikePost}
                editPost={editPost}
                post={post}
                image={post.image}
                author={author}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default LoggedIn;
