import "./LoggedIn.css";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import { PostCard } from "../../components/Post/PostCard/PostCard";
import firebase, { firestore } from "../../firebase";
import { FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useUserAreaContext } from "../../providers/UserAreaProvider";
import { Spinner } from "../../utils/Spinner/Spinner";
import Header from "../../UI/Header/Header";

const LoggedIn = () => {
  const [author] = useUserAreaContext();
  const [loading, setLoading] = useState(false);
  const [postAuthor, setPostAuthor] = useState();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [filterFavourites, setFilterFavourites] = useState(false);

  const getPosts = () => {
    setLoading(true);
    const unsuscribe = firestore
      .collection("posts")
      .limit(20)
      .orderBy("createdOn", "desc")

      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
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
        setLoading(false);
      });

    return () => unsuscribe();
  };

  const getComments = () => {
    const unsuscribe = firestore
      .collection("comments")
      .orderBy("createdOn", "desc")

      .onSnapshot((snapshot) => {
        const comments = snapshot.docs.map((doc) => {
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

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  const erasePost = (id) => {
    firestore
      .collection(`posts`)
      .doc(id)
      .delete()
      .then((post) => {
        console.log("the post was successfully deleted");
      })
      .catch((error) =>
        console.error(
          "some error has occured on deleting the post",
          error.message
        )
      );
  };

  const eraseComment = (commentID) => {
    firestore
      .collection(`comments`)
      .doc(commentID)
      .delete()
      .then((comment) => {
        console.log("the comment was successfully deleted", comment);
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
        console.log("the comments for this post has been successfully updated");
      })
      .catch((error) =>
        console.error(
          "some error has occured on commenting the post",
          error.message
        )
      );
  };

  const likeComment = (id) => {
    firestore
      .collection(`comments`)
      .doc(id)
      .get()
      .then((comment) => {
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
        console.log("the likes for this comment has been successfully updated");
      })
      .catch((error) =>
        console.error(
          "some error has occured on liking/disliking the comment",
          error.message
        )
      );
  };

  return (
    <div className="font-face-silk">
      {loading && <Spinner />}
      <Header />
      <main className="logged-in-main">
        <CreatePost setPostAuthor={setPostAuthor} getPosts={getPosts} />

        {posts.length > 0 && (
          <section className="logged-in-section">
            <button
              className={`fav-button ${filterFavourites ? "true" : "false"}`}
              onClick={() => setFilterFavourites(!filterFavourites)}
            >
              {`${filterFavourites ? "Hide" : "Show"} Favourites!`}
              <FaStar />
            </button>
            {posts?.map((post) => {
              if (filterFavourites) {
                if (post?.likes.includes(author.uid)) {
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
              } else {
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
        )}
      </main>
    </div>
  );
};

export default LoggedIn;
