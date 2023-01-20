import React from "react";

import "../../utilities.css";
import CreateLobby from "../modules/CreateLobby.js";
import JoinLobby from "../modules/JoinLobby.js";
import "./Skeleton.css";

const Skeleton = (props) => {
  if (!props.userId) {
    return <div>Log in before playing</div>;
  }
  return (
    <div className="center-div">
      {" "}
      <h1>
        Hello <span className="gradient-text">{props.userName}</span>, let's play UnIson
      </h1>
      <CreateLobby userName={props.userName} />
      <JoinLobby userName={props.userName} />
    </div>
  );
};

export default Skeleton;
