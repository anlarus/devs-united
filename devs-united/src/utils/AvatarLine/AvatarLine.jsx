// import React from "react";
// import { useState } from "react";
// import "./AvatarLine.css";
// import { avatarsCollection } from "../../utils/avatars.js";

// const AvatarLine = () => {
//   const [check, setCheck] = useState(false);
//   const [userAvatar, setUserAvatar] = useState("");
//   console.log(userAvatar);

//   return (
//     <>
//       <p className="font-face-fira">Select your favorite color</p>

//       <div className="color-cover">
//         {avatarsCollection.map((avatar) => {
//           return (
//             <div key={avatar.id}
//             className={`color-box`}>
//             <img key={avatar.alt}
//             alt = {avatar.alt}
//             src = {avatar.url}
//               onClick={(event) => {
//                 setCheck(true);
//                 setUserAvatar(event.target.url);
//                 console.log(userAvatar);
//               }}
              
//             />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default AvatarLine;
