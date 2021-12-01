import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDl315CZcdrgzu3omYA3S-im6ZAPmFAPI8",
    authDomain: "acamica-start-project.firebaseapp.com",
    projectId: "acamica-start-project",
    storageBucket: "acamica-start-project.appspot.com",
    messagingSenderId: "384844068372",
    appId: "1:384844068372:web:a2cf37085649965930d901"
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
