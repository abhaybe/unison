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
    <>
      {" "}
      <h1>orion and abhay say hi</h1>
      <CreateLobby userName={props.userName} />
      <JoinLobby userName={props.userName} />
    </>
  );
};

export default Skeleton;
