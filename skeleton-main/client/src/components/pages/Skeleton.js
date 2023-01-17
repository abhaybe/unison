import React from "react";

import "../../utilities.css";
import "./Skeleton.css";
import CreateLobby from "../modules/CreateLobby";
import JoinLobby from "../modules/JoinLobby";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

const Skeleton = () => {
  return (
    <>
      <p>Welcome to U&Ison!</p>
      <CreateLobby />
      <JoinLobby />
    </>
  );
};

export default Skeleton;
