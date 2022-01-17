import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCdcxOdJE4z1yxdvRyTHKnXDT1oiXyFxlU",
  authDomain: "devs-united-e7ac5.firebaseapp.com",
  projectId: "devs-united-e7ac5",
  storageBucket: "devs-united-e7ac5.appspot.com",
  messagingSenderId: "210198125839",
  appId: "1:210198125839:web:e5f1c71dc2ba7c38eb727a"
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signOut = () => auth.signOut()
export default firebase;
