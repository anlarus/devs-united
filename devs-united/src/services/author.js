import { firestore } from "../firebase";

export const getAuthor = async (uid) => {
  const snapshot = await firestore.collection("authors").doc(uid).get();

  if (snapshot.exists) {
    return snapshot.data();
  }
  return null;
};
