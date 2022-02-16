import React, { useState, useEffect } from "react";
import "./Entrance.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import ColorLine from "../../components/ColorLine/ColorLine.jsx";
import firebase, { auth, firestore, storage, provider } from "../../firebase";
import { useStyle } from "../../providers/StyleProvider";
import { SignUpInput, SignInInput } from "../../components/UserArea/UserInput";
import GoogleLogin from "react-google-login";
import { useUserAreaContext } from "../../providers/UserAreaProvider";
import { getAuthor } from "../../services/author";

const Entrance = () => {
  const [body, setBody] = useState({});
  const [avatar, setAvatar] = useState({});
  const [progress, setProgress] = useState(0);
  const [author, setAuthor, reg, setReg] = useUserAreaContext();
  const [authorColor, setAuthorColor] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [enter, setEnter] = useState("Sign In ");

  useEffect(() => {
    console.log("author in the entrance =>", auth.currentUser);
  }, []);

  // const signInWithGoogle = (response) => {
  //   const { displayName, email, uid, photoURL } = response.profileObj;
  //   setAuthor({
  //     displayName,
  //     email,
  //     uid,
  //     photoURL,
  //   });
  // };

  const signInWithGoogle = async (response) => {
    const { displayName, email, uid, photoURL } = response.profileObj;

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        let db = firebase.firestore();
        db.collection("authors")
          .doc(uid)
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              setAuthor(doc);
            } else {
              db.collection("authors")
                .doc(user.uid)
                .set({
                  avatar: photoURL || avatar,
                  email: email,
                  uid: uid,
                  authorColor: authorColor,
                  displayName: displayName,
                });
              const user = await getAuthor(uid);
              setAuthor(user);
            }
          });
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
   console.log("some error occured on google API =>", error.message)
        // ...
      })
      .finally(setReg(!reg));
  };

  const signUp = (event) => {
    event.preventDefault();
    let { email, password } = body;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        setAuthor(userCredential.user);

        const { email, uid } = userCredential.user;

        firestore.collection("authors").doc(uid).set({
          avatar: avatar,
          email: email,
          uid: uid,
          authorColor: authorColor,
          displayName: displayName,
        });

        const user = await getAuthor(uid);

        setAuthor(user);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(setReg(!reg));
  };

  const signIn = (event) => {
    event.preventDefault();
    let { email, password } = body;

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        console.log("sign in success", userCredential);
        console.log("sign in success", userCredential.user);
        const { uid } = userCredential.user;

        const user = await getAuthor(uid);

        setAuthor(user);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(setReg(!reg));
  };

  const registerHandler = () => {
    setReg(!reg);
    setEnter("Sign up ");
  };

  return (
    <main className="sing-in-main">
      {!author && !reg && (
        <>
          <DevsBigLogo />

          <form className="font-face-silk" onSubmit={signIn}>
            <p>
              welcome{" "}
              <span>{`${displayName ? { displayName } : "dear author"}`}</span>
            </p>

            <SignInInput
              body={body}
              setBody={setBody}
              setDisplayName={setDisplayName}
              signInWithGoogle={signInWithGoogle}
              enter={enter}
              signIn={signIn}
            />
          </form>
          <p onClick={registerHandler}>
            Or <span>Sign Up</span>
          </p>
        </>
      )}

      {!author && reg && (
        <>
          <DevsBigLogo />

          <form className="font-face-silk sign-in-form" onSubmit={signUp}>
            <SignUpInput
              body={body}
              setBody={setBody}
              setDisplayName={setDisplayName}
              setAuthorColor={setAuthorColor}
              setAvatar={setAvatar}
              signInWithGoogle={signInWithGoogle}
              enter={enter}
              signUp={signUp}
            />
            <p onClick={registerHandler}>
              Or <span>Sign In</span>
            </p>
          </form>
        </>
      )}
    </main>
  );
};

export default Entrance;
