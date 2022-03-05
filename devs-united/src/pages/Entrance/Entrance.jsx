import React, { useState } from "react";
import "./Entrance.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import firebase, { auth, firestore, provider } from "../../firebase";
import { SignUpInput, SignInInput } from "../../components/UserArea/UserInput";
import { useUserAreaContext } from "../../providers/UserAreaProvider";
import { getAuthor } from "../../services/author";

const Entrance = () => {
  const [author, setAuthor, reg, setReg] = useUserAreaContext();
  const [body, setBody] = useState({});
  const [avatar, setAvatar] = useState({});

  const [authorColor, setAuthorColor] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [enter, setEnter] = useState("Sign In ");

  const signInWithGoogle = async () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, uid, photoURL } = result.user;

        let db = firebase.firestore();
        db.collection("authors")
          .doc(uid)
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              setAuthor(doc.data());
            } else {
              db.collection("authors")
                .doc(uid)
                .set({
                  avatar: photoURL || avatar,
                  email: email,
                  uid: uid,
                  authorColor: authorColor || "yellow",
                  displayName: displayName || "TEST NAME",
                });
              const user = await getAuthor(uid);
              setAuthor(user);
            }
          });
      })
      .catch(function (error) {
        console.log("some error occured on google API =>", error.message);
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
      .finally();
  };

  const signIn = (event) => {
    event.preventDefault();
    let { email, password } = body;

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        console.log("sign in success", userCredential.user);
        const { uid } = userCredential.user;

        const user = await getAuthor(uid);

        setAuthor(user);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally();
  };

  const registerHandler = () => {
    setReg(!reg);
    enter == "Sign In " ? setEnter("Sign up ") : setEnter("Sign In ");
  };

  return (
    <main className="sing-in-main">
      {!author && !reg && (
        <>
          <DevsBigLogo />
          <form className="font-face-silk" onSubmit={signIn}>
            <p>
              welcome {""}
              <span> dear author</span>
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
          <p className="font-face-silk" onClick={registerHandler}>
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
            <p className="font-face-silk" onClick={registerHandler}>
              Or <span>Sign In</span>
            </p>
          </form>
        </>
      )}
    </main>
  );
};

export default Entrance;
