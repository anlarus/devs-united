import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSWJEwRozmd1Jbv9_fMb_9LplaZYYWto8",
  authDomain: "dev-united-cyf-1.firebaseapp.com",
  projectId: "dev-united-cyf-1",
  storageBucket: "dev-united-cyf-1.appspot.com",
  messagingSenderId: "150594986824",
  appId: "1:150594986824:web:f904b5a30830b0d9de097d",
  measurementId: "G-C9KM5901VK"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;
