import React, { useState, useEffect } from "react";

import "../../utilities.css";
import CreateLobby from "../modules/CreateLobby.js";
import JoinLobby from "../modules/JoinLobby.js";
import "./Skeleton.css";
import { get, post } from "../../utilities.js";

const Skeleton = (props) => {
  if (!props.userId) {
    return <div>Log in before playing</div>;
  }
  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);

  useEffect(() => {
    get("/api/getuser", { userId: props.userId })
      .then((user) => {
        setName(user.username);
        setId(user._id);
        console.log("hello two", user._id);
        console.log("hi", user);
      })
      .then(() => {
        console.log("hello two", userId);
      });
  });

  return (
    <div>
      {" "}
      <h1 className="center-div">
        Hello <span className="gradient-text">{userName}</span>, let's play U&Ison
      </h1>
      <CreateLobby userId={userId} />
      <JoinLobby userId={userId} />
    </div>
  );
};

export default Skeleton;
