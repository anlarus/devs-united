// import { useState, useEffect } from "react";

// const useFetch = ({ url, enabled }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   const getAllTweets = () => {
//     firestore
//       .collection("tweets")
//       // .limit(1)
//       // .where('likes', '>', number)
//       // .orderBy('likes', 'asc')
//       // .startAt(30)
//       // .endAt(50)
//       .get()
//       .then((snapshot) => {
//         const tweets = snapshot.docs.map((doc) => {
//           return {
//             message: doc.data().message,
//             user: doc.data().user,
//             likes: doc.data().likes || 0,
//             image: doc.data().image || false,
//             id: doc.id,
//           };
//         });
//         setTweets(tweets);
//       });
//   };



//   useEffect(() => {
//     const unsuscribe = firestore.collection("tweets").onSnapshot((snapshot) => {
//       console.log(snapshot.docChanges());
//       const tweets = snapshot.docs.map((doc) => {
//         return {
//           message: doc.data().message,
//           user: doc.data().user,
//           likes: doc.data().likes,
//           id: doc.id,
//         };
//       });
//       setTweets(tweets);
//     });
//     return () => unsuscribe();
//   }, []);


// export default useFetch;
