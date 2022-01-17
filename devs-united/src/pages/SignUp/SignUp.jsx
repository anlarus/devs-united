import React, { useState, useEffect } from "react";
import "./SignUp.css";
import DevsBigLogo from "../../utils/DevsBigLogo.jsx";
import ColorLine from "../../components/ColorLine/ColorLine.jsx";
// import AvatarLine from "../../components/AvatarLine/AvatarLine.jsx";
import firebase, { auth, firestore } from "../../firebase";
import { useStyle } from "../../providers/StyleProvider";
import { SignUpInput, UserFile } from "../../components/UserInput/UserInput";
import { GoogleButton } from "../../components/GoogleButton/GoogleButton";



const SignUp = () => {
  const [body, setBody] = useState();
  const [avatar, setAvatar] = useState({});
  const [userColor, setUserColor] = useState("");
  console.log(userColor);

  const signUp = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(body.email, body.password)
      .then((authorCredential) => {
        console.log(authorCredential);
        firestore
          .collection("authors")
          .add({
            email: body.email,
            uid: authorCredential.user.uid,
            userColor: userColor,
            displayName: authorCredential.displayName || body.displayName,
            avatar:
              authorCredential.avatar ||
              "https://cdn0.iconfinder.com/data/icons/tiny-icons-1/100/tiny-08-512.png",
          })
          .then(() => console.log("author created"))
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleUploadAvatar = (event) => {
    setAvatar(event.target.files[0]);
  };

  return (
    <main className="sing-in-main">
      <form className="font-face-silk sign-in-form" onSubmit={signUp}>
        <DevsBigLogo />
        <h1>
          welcome <span>name!</span>
        </h1>

        <ColorLine setUserColor={setUserColor} userColor={userColor} />
        {/* <AvatarLine /> */}

        <UserFile name="photoURL" handleUpload={handleUploadAvatar} />

        <GoogleButton />

        <p className="font-face-fira">or sign in with your email</p>

        <SignUpInput body={body} setBody={setBody} />

        <input type="submit" className="reg-button-cover" value="Create user" />

      </form>
    </main>
  );
};

export default SignUp;
