import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { firestore } from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [tweets, setTweets] = useState([]);
  const [body, setBody] = useState({});


  const getAllTweets = () => {
    firestore
      .collection("tweets")
      // .limit(1)
      // .where('likes', '>', number)
      // .orderBy('likes', 'asc')
      // .startAt(30)
      // .endAt(50)
      .get()
      .then((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            message: doc.data().message,
            user: doc.data().user,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });
  };

  const createTweet = (e) => {
    e.preventDefault();
    firestore
      .collection("tweets")
      .add(body)
      .then(getAllTweets())
      .catch((error) => console.error("has occured an", error));
  };

  const handleOnChange = (e) => {
    let newTweet = {
      ...body,
      [e.target.name]: e.target.value,
    };
    setBody(newTweet);
  };

  const deleteTweet=(id)=> {
firestore.collection("tweets")
.doc(id)
.delete()
.then(getAllTweets())
.catch((error) => console.error("has occured an", error));
  }

  let number = 20;

  useEffect(() => {
    firestore
      .collection("tweets")
      .limit(1)
      .where("likes", ">", number)
      .orderBy("likes", "asc")
      .startAt(30)
      .endAt(50)
      .get()
      .then((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            message: doc.data().text,
            user: doc.data().author,
            id: doc.id,
          };
        });
        console.log(tweets);
        setTweets(tweets);
      });
  }, []);

  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <Router>
      <div className="App">
        {tweets.map((tweet) => {
          return (
            <div>
              <div className="who">{tweet.user}</div>
              <div className="what">{tweet.message}</div>
              <div className="id">{tweet.id}</div>
              <button onClick={()=>deleteTweet(tweet.id)}>erase</button>
            </div>
          )
        })}
        <form onSubmit={createTweet}>
          <input name="user" onChange={handleOnChange} type="text"></input>
          <textarea name="message" onChange={handleOnChange}></textarea>
          <input type="submit" value="post" />
        </form>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
