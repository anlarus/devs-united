import "./LoggedIn.css";
import CreatePost from "../../components/Post/CreatePost";
import { PostCard } from "../../components/Post/PostCard/PostCard";
import firebase, { firestore, storage, auth, signOut } from "../../firebase";
import {
  FaStar
} from "react-icons/fa";
import { useStyle } from "../../providers/StyleProvider";
import React, { useState, useEffect, useRef } from "react";
import { useUserAreaContext } from "../../providers/UserAreaProvider";

const LoggedIn = () => {
  const {
    style: { deviceClass },
  } = useStyle();
  const [author, setAuthor] = useUserAreaContext();
  const [postAuthor, setPostAuthor] = useState();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [filterFavourites, setFilterFavourites] = useState(false);
  const [nameToFilter, setNameToFilter] = useState(false);

  console.log("from logged in", author);

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  //una vista adicional, textarea, update - message - new value//

  const getPosts = () => {
    const unsuscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        console.log("post contaner from getpost", doc.data());

        console.log("post id from getPost", doc.id);

        return {
          message: doc.data().message,
          author: doc.data().author,
          authorName: doc.data().authorName,
          authorColor: doc.data().authorColor,
          avatar: doc.data().avatar,
          postID: doc.id,
          createdOn: doc.data().createdOn,
          updatedOn: doc.data().updatedOn,
          likes: doc.data().likes || [],
          imageURL: doc.data().imageURL || false,
        };
      });
      setPosts(posts);
    });

    return () => unsuscribe();
  };

  const getComments = () => {
    const unsuscribe = firestore
      .collection("comments")
      .onSnapshot((snapshot) => {
        const comments = snapshot.docs.map((doc) => {
          console.log(doc.data());

          console.log(doc.id);

          return {
            message: doc.data().message,
            author: doc.data().author,
            authorName: doc.data().authorName,
            authorColor: doc.data().authorColor,
            commentID: doc.id,
            createdOn: doc.data().createdOn,
            likes: doc.data().likes || [],
            referenceToPost: doc.data().referenceToPost,
          };
        });

        setComments(comments);
      });

    return () => unsuscribe();
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
        console.log("se elimino el post de referencia");
      })
      .catch((error) =>
        console.error(
          "some error has occured on deleting the post",
          error.message
        )
      );
  };

  const eraseComment = (commentID) => {
    console.log("el id de comment a eliminar es =>", commentID);
    firestore
      .collection(`comments`)
      .doc(commentID)
      .delete()
      .then((comment) => {
        console.log("the comment was deleted successfully", comment);
      })
      .catch((error) =>
        console.error(
          "some error has occured on deleting the comment",
          error.message
        )
      );
  };

  const likePost = (id) => {
       firestore
      .collection(`posts`)
      .doc(id)
      .get()
      .then(async (post) => {
      
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

  const commentPost = (id) => {
       firestore
      .collection(`posts`)
      .doc(id)
      .get()
      .then(async (post) => {
          newComment(post, id, author);
      });
  };

  const newComment = (post, id, author, comment) => {
    firestore
      .doc(`posts/${id}`)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(author.uid),
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

  const likeComment = (id) => {
    console.log("the liked post is =>", id);

    firestore
      .collection(`comments`)
      .doc(id)
      .get()
      .then((comment) => {
        console.log("se trajo el comment de referencia", comment.data());
        updateCommentLike(comment, id, author);
      });
  };

  const updateCommentLike = (comment, id, author) => {
    const isInArray = comment?.data().likes?.includes(author.uid);
    firestore
      .doc(`comments/${id}`)
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
        <button className="fav-button" onClick={() => setFilterFavourites(!filterFavourites)}>
          Show favourites! <FaStar/>
        </button>
          {posts?.map((post) => {
            if (filterFavourites) {
              if (post?.likes.includes(author.uid)) {
                return (
                  <PostCard
                    nameToFilter={nameToFilter}
                    setNameToFilter={setNameToFilter}
                    key={post.postID}
                    id={post.postID}
                    message={post.message}
                    createdOn={post.createdOn}
                    updatedOn={post.updatedOn}
                    likes={post.likes}
                    erasePost={erasePost}
                    likePost={likePost}
                    post={post}
                    author={author}
                    commentPost={commentPost}
                    likeComment={likeComment}
                    eraseComment={eraseComment}
                    comments={comments}
                    getComments={getComments}
                  />
                );
              }
            }
            //else if (nameToFilter) {
            //   if (post?.authorName == nameToFilter) {
            //     return (
            //       <PostCard
            //         nameToFilter={nameToFilter}
            //         setNameToFilter={setNameToFilter}
            //         key={post.postID}
            //         id={post.postID}
            //         message={post.message}
            //         createdOn={post.createdOn}
            //         updatedOn={post.updatedOn}
            //         likes={post.likes}
            //         erasePost={erasePost}
            //         likePost={likePost}
            //         post={post}
            //         author={author}
            //         commentPost={commentPost}
            //         likeComment={likeComment}
            //         eraseComment={eraseComment}
            //         comments={comments}
            //         getComments={getComments}
            //       />
            //     );
            //   }
            // }
            else {
              return (
                <PostCard
                  nameToFilter={nameToFilter}
                  setNameToFilter={setNameToFilter}
                  key={post.postID}
                  id={post.postID}
                  message={post.message}
                  createdOn={post.createdOn}
                  updatedOn={post.updatedOn}
                  likes={post.likes}
                  erasePost={erasePost}
                  likePost={likePost}
                  post={post}
                  author={author}
                  commentPost={commentPost}
                  likeComment={likeComment}
                  eraseComment={eraseComment}
                  comments={comments}
                  getComments={getComments}
                />
              );
            }
          })}
        </section>
      </main>
    </div>
  );
};

export default LoggedIn;
