import React, { useState, useEffect } from "react";

import "../../utilities.css";
import CreateLobby from "../modules/CreateLobby.js";
import JoinLobby from "../modules/JoinLobby.js";
import "./Skeleton.css";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";

const Skeleton = (props) => {
  // <audio src="\Users\orion\Downloads\Jeremy Zucker & Chelsea Cutler - emily (Lyric Video).mp3">
  //   <p>If you are reading this, it is because your browser does not support the audio element. </p>
  // </audio>;
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
      <div className="backgroundanimation text-color">
        <div className="tab">
          {" "}
          <h1 className="center-div">
            Hello <span className="gradient-text text-color">{userName}</span>, let's play U&Ison!
          </h1>
          <h1 className="center-div text-color">
            You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
          </h1>
          <div className="center-div text-color">
            <button className="Skeleton-Button hover">
              <Link to="/lobby">Go to Lobby</Link>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-color">
        <div className="backgroundanimation text-color">
          <div className="tab text-color ">
            {" "}
            <h1 className="center-div text-color">
              Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
            </h1>
            <CreateLobby userId={userId} />
            <JoinLobby userId={userId} />
          </div>
        </div>
      </div>
    );
  }
};

export default Skeleton;
