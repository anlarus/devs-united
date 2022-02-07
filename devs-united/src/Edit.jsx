import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import firebase, { firestore, storage, auth, signOut } from "./firebase";

export const Edit = () => {
  const [texto, setTexto] = useState("");
  const { id } = useParams();
  useEffect(() => {
    console.log("from edit post - it´s id", id);

    firestore
      .collection("posts")
      .doc(id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        const post = snapshot.data();
        setTexto(post.message);
      });
  }, [id]);

  const handleText = (e) => {
    setTexto(e.target.value);
  };

  const editar = () => {
    console.log(texto);

    firestore
      .collection("posts")
      .doc(id)
      .update({
        message: texto,
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(console.log("post modified successfully"))
      .catch((err) => console.error("error al modificar el post", err));
  };

  return (
    <>
      <input type="text" value={texto} onChange={handleText} />
      <button onClick={editar}>Salvar</button>
    </>
  );
};
