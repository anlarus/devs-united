import React, { useState, useEffect } from "react";
import "./Entrance.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import ColorLine from "../../components/ColorLine/ColorLine.jsx";
import firebase, { auth, firestore, storage } from "../../firebase";
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

  const signInWithGoogle = (response) => {
    const { displayName, email, uid, photoURL } = response.profileObj;
    setAuthor({
      displayName,
      email,
      uid,
      photoURL,
    });
  };

  const signUp = (event) => {
    event.preventDefault();
    let { email, password } = body;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setAuthor(userCredential.user);
        //imprimimos el objeto que devuelve auth para suscribir bien sus campos segun la orden
        //destructuramos el objeto para acceder a sus valores
        const { email, uid, photoURL } = userCredential.user;

        firestore
          .collection("authors")
          .doc(uid)
          .set({
            photoURL: photoURL || "https://ibb.co/BwqVf19",
            email: email,
            uid: uid,
            authorColor: authorColor,
            displayName: displayName,
            posts: [],
          });
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

  const handleUploadAvatar = (event) => {
    setAvatar(event.target.files[0]);
  };

  const registerHandler = () => {
    setReg(!reg);
    setEnter("Sign up ");
  };

  return (
    <main className="sing-in-main">
      <DevsBigLogo />

      {!author && !reg && (
        <>
          <form className="font-face-silk" onSubmit={signIn}>
            <p>
              welcome{" "}
              <span>{`${
                displayName ? { displayName } : "anonimous author"
              }`}</span>
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
        <form className="font-face-silk sign-in-form" onSubmit={signUp}>
          <SignUpInput
            body={body}
            setBody={setBody}
            setDisplayName={setDisplayName}
            setAuthorColor={setAuthorColor}
            signInWithGoogle={signInWithGoogle}
            enter={enter}
            signUp={signUp}
          />
          <p onClick={registerHandler}>
            Or <span>Sign In</span>
          </p>
        </form>
      )}
    </main>
  );
};

export default Entrance;
