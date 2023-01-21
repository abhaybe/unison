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

  useEffect(() => {
    get("/api/getuser", { userId: props.userId }).then((user) => {
      setName(user.username);
      console.log(props.userId);
      console.log("hi", user);
    });
  }, []);

  return (
    <div>
      {" "}
      <h1 className="center-div">
        Hello <span className="gradient-text">{userName}</span>, let's play U&Ison
      </h1>
      <CreateLobby userName={props.userName} />
      <JoinLobby userName={props.userName} />
    </div>
  );
};

export default Skeleton;
