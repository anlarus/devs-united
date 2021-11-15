import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { firestore } from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [tweets, setTweets] = useState([]);
  const [body, setBody] = useState({});

  const getAllTweets = () => {};

  const createTweet = (e) => {
    e.preventDefault();
    let tweet = firestore
      .collection("tweets")
      .add(body)
      .then((docRef) => {
        return docRef.get();
      })
      .catch(error => console.error("has occured an", error))
  };

  const handleOnChange = () => {
    let newTweet = {
      ...body,
      [e.target.name]: e.target.value,
    };
    setBody(newTweet);
  };

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
            message: doc.data().message,
            user: doc.data().user,
            id: doc.id,
          };
        });
        console.log(tweets);
        setTweets(tweets);
      });
  }, []);

  return (
    <Router>
      <div className="App">
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
