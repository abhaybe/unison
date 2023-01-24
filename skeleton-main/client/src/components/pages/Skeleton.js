import React, { useState, useEffect } from "react";

import "../../utilities.css";
import CreateLobby from "../modules/CreateLobby.js";
import JoinLobby from "../modules/JoinLobby.js";
import "./Skeleton.css";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";

const Skeleton = (props) => {
  if (!props.userId) {
    return (
      <div className="backgroundanimation">
        <div className="tab">
          {" "}
          <h1 className="center-div text-color">Please log in to play U&Ison.</h1>
        </div>
      </div>
    );
  }

  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);
  const [userLobby, setLobby] = useState("");
  const [userWins, setWins] = useState(0);

  useEffect(() => {
    get("/api/getuser", { userId: props.userId })
      .then((user) => {
        setName(user.username);
        setId(user._id);
        setLobby(user.lobby);
        setWins(user.wins);
      })
      .then(() => {});
  });
  console.log({ userLobby }.userLobby);

  if ({ userLobby }.userLobby !== "") {
    return (
      <div className="backgroundanimation">
        <div className="tab">
          {" "}
          <h1 className="center-div">
            Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
          </h1>
          <h1 className="center-div">
            You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
          </h1>
          <div className="center-div color-text">
            <Link to="/lobby">Go to lobby</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="backgroundanimation">
        <div className="tab ">
          {" "}
          <h1 className="center-div text-color">
            Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
          </h1>
          <CreateLobby userId={userId} />
          <JoinLobby userId={userId} />
        </div>
      </div>
    );
  }
};

export default Skeleton;
