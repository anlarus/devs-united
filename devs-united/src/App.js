import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import { firestore, storage, auth } from "./firebase";
import { useState, useEffect } from "react";
import swal from '@sweetalert/with-react';
import { useProtectedContext } from "./context/Protected";

function App() {

  const [tweets, setTweets] = useState([]);
  const [body, setBody] = useState({});
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);

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
            likes: doc.data().likes || 0,
            image: doc.data().image|| false,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });
  };

  const createTweet = (e) => {
    e.preventDefault();
    
    const uploadTask = storage.ref().child(`tweets/${file.name}`).put(file);
    
    uploadTask
    .on(`the tweet state changed`, 
    (snapshot) => { 
      console.log(snapshot);
      let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100; 
      setProgress(progress);
      console.log('the image hase been uploaded')
      console.log(progress)
    },
    (err) => {
      console.error("an error has occured during we were creating tweet ",err.message)
    },
    ()=> {

      uploadTask.snapshot.ref.getDownloadURL().then((url)=> {
          firestore.collection("tweets")
          .add({...body, image: url}) 
          .then(()=>console.log(`se subio la imagen`))
          .catch((err)=>console.error(err.message));   
        });
        setProgress(0);
    })
  };

  const handleOnChange = (e) => {
    let newTweet = {
      ...body,
      [e.target.name]: e.target.value,
    };
    setBody(newTweet);
  };

  const deleteTweet = (id) => {
    firestore
      .collection("tweets")
      .doc(id)
      .delete()
      .then(getAllTweets())
      .catch((error) => console.error("has occured an", error.message));
  };

  const likeTweet = (tweet) => {
    firestore
      .doc(`tweets/${tweet.id}`)
      .update({ likes: tweet.likes + 1 })
      .then(
        console.log("se actualizo")
      )
      .catch((error) => console.error("has occured an ", error.message));
  };

  // const editTweet = (tweet) => {
  //   setMessage({
  //     message: tweet.data().message,
  //   });
  // };

  // const updateTweet = (tweet) => {
  //   firestore
  //     .doc(`tweets/${tweet.id}`)
  //     .update(editTweet())
  //     .then(
  //       console.log("se actualizo")
  //       // getAllTweets()
  //     )
  //     .catch((error) => console.error("has occured an ", error.message));
  // };

  let number = 20;

  useEffect(() => {
    const unsuscribe = firestore
    .collection("tweets")
    .onSnapshot((snapshot) => {
      console.log(snapshot.docChanges());
      const tweets = snapshot.docs.map((doc) => {
        return {
          message: doc.data().message,
          user: doc.data().user,
          likes: doc.data().likes,
          id: doc.id,
        };
      });
      setTweets(tweets);
    });
    return () => unsuscribe();
  }, []);

  const handleUpload = (e) => {
    // e.preventDefault();
    setFile(e.target.files[0]);
    storage.ref()
    .child(`tweets/${e.target.files[0].name}`)
    .put(e.target.files[0])
    .then(()=> {
      console.log("success")
    });
  };

  return (
    <Router>
      <div className="App">
        {tweets.map((tweet) => {
          console.log(tweet)
          return (
            <div>
              <div className="id">{tweet.id}</div>
              <div className="who">{tweet.user}</div>
              <div className="what">{tweet.message}</div>
              <div className="rate">{tweet.likes}</div>
              <div>
                { tweet.image && <img src={tweet.image}/>}
              </div>
              <button onClick={() => deleteTweet(tweet.id)}>erase</button>
              <button onClick={() => likeTweet(tweet)}>like</button>
              {/* <button onClick={() => updateTweet(tweet)}>edit</button> */}
            </div>
          );
        })}
        <form onSubmit={createTweet}>
          <input name="user" onChange={handleOnChange} type="text" defaultValue={body.user}>
          </input>
          <textarea name="message" onChange={handleOnChange}></textarea>
          <input type="file" onChange={handleUpload} />
          {progress > 0 && <progress max="100" value={progress}>{progress}%</progress>}
          <input className="user-name-input" type="submit" value="post" />
        </form>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loggin" element={<Login />} />
          <Route path="/loggedIn" element={<LoggedIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
