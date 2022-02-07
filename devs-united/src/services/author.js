import { firestore } from "../firebase";

export const getAuthor = async (uid) => {
  const snapshot = await firestore.collection("authors").doc(uid).get();

  if (snapshot.exists) {
    console.log("the author snapshot comes as =>", snapshot.data());
    return snapshot.data();
  }
  return null;
};
