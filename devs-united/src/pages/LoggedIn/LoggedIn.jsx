import { useEffect, useState } from "react";
import React from "react";
import "./LoggedIn.css";
import Avatar from "../../assets/images/avatarMusic.png";
import { UserFile, UserMessage } from "../../components/UserInput/UserInput";
import {
  PostCard,
  PostCard6,
} from "../../components/PostCard/PostCard";
import { firestore, storage, auth } from "../../firebase";
import { useStyle } from "../../providers/StyleProvider";
import userEvent from "@testing-library/user-event";

const LoggedIn = () => {
  const {
    style: { deviceClass },
  } = useStyle();
  const [posts, setPosts] = useState([]);
  const [body, setBody] = useState({
    post: "",
    author: "",
  });

  const getPostsByLikesNumber = () => {
    firestore
      .collection("posts")
      //.limit(4)
      //.where('likes','>=',numberA)
      //.where('likes','<=',numberB)
      //.orderBy('likes','desc')
      //.startAt(numberA)
      //.endAt(numberB)
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          return {
            message: doc.data().message,
            author: doc.data().author,
            id: doc.id,
            date: doc.data().date,
            likes: doc.data().likes,
          };
        });
        setPosts(posts);
      });
  };

  useEffect(() => {
    getPostsByLikesNumber();
    console.log(createPost);
  }, []);

  const handleOnchange = (event) => {
    let newPost = {
      ...body,
      [event.target.name]: event.target.value,
    };
    setBody(newPost);
  };

  const createPost = (event) => {
    event.preventDefault();
    firestore
      .collection("posts")
      .add(body)
      .then((docRef) => {
        setBody({
          message: "",
          author: "",
        });
      })
      .catch((error) => console.error("some error has occured", error));
  };

  const erasePost = (id) => {
    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        getPostsByLikesNumber();
      })
      .catch((error) => console.error("some error has occured", error));
  };

  const editPost = (id) => {
    firestore
      .collection("posts")
      .doc(id)
      .update(
        body
      )
      .then(() => {
        getPostsByLikesNumber();
      })
      .catch((error) => console.error("some error has occured", error));
  };

  return (
    <div className="font-face-silk">
      <main className="logged-in-main">
        <form className="logged-in-form" onSubmit={createPost}>
          <div className="message-cover">
            <div className="message-box-left">
              <img src={Avatar} alt="avatar profile image" />
            </div>
            <div className="message-box-right">
              <input
                type="text"
                name="author"
                value={body.author}
                onChange={handleOnchange}
              />
              <UserMessage value={body.message} onChange={handleOnchange} />
            </div>
          </div>
          <div>
            <UserFile />
            <input className="font-face-silk" type="submit" value="post" />
          </div>
          <progress className="upload-progress" max="100" value="10"></progress>
        </form>

        <section className="logged-in-section">
          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                message={post.message}
                author={post.author}
                date={post.date}
                likes={post.likes}
                erasePost={erasePost}
                editPost={editPost}
              />
            );
          })}

          <PostCard6 />
        </section>
      </main>
      <p className="font-face-fira tradeMark">
        © 2022 Devs_United - <span>BETA</span>
      </p>
      <div className="footer-underline"></div>
    </div>
  );
};

export default LoggedIn;
