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
  // if (!props.lobbyId) {
  //   return <div>blh</div>;
  // }
  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);
  const [userLobby, setLobby] = useState("");
  const [userWins, setWins] = useState(0);

  // useEffect(() => {
  //   get("/api/getlobby", { lobbyId: props.lobbyId })
  //     .then((user) => {
  //       setLobby(user.lobby);
  //       console.log("hello two", user._id);
  //       console.log("hi", user);
  //     })
  //     .then(() => {
  //       console.log("hello two", userId);
  //     });
  // });

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
      <div>
        {" "}
        <h1 className="center-div">
          Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
        </h1>
        <h1 className="center-div">
          You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <h1 className="center-div">
          Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
        </h1>
        <h1 className="center-div">
          You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
        </h1>
        <CreateLobby userId={userId} />
        <JoinLobby userId={userId} />
      </div>
    );
  }
};

export default Skeleton;
