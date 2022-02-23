import React from "react";

const Empty = () => {
 
  return (
    <div>
      <div>
        Nothing found...
        <span>try again!</span>
      </div>
      <div className={`card`}>
        <img
          src="https://media0.giphy.com/media/3o6nUP8qIocREIa7hm/giphy.gif?cid=ecf05e4724ddrkxiw5liymr9mk58886s97hi8dgl1px7zpe9&rid=giphy.gif&ct=g"
          alt="not found"
        />
      </div>
    </div>
  );
};

export default Empty;
