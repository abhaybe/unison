import React from "react";

import "../../utilities.css";
import CreateLobby from "../modules/CreateLobby.js";
import JoinLobby from "../modules/JoinLobby.js";
import "./Skeleton.css";

const Skeleton = () => {
  return (
    <>
      {" "}
      <h1>orion and abhay say hi</h1>
      <CreateLobby />
      <JoinLobby />
    </>
  );
};

export default Skeleton;
