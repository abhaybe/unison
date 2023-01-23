import React, { useState, useEffect } from "react";
// import Player from "./Player";
// import Leaderboard from "../pages/Playerboard";
import Player from "./Player";
// import "./Player.css";

const PlayerList = ({ playerlist }) => {
  console.log("deez nuts", playerlist);
  return playerlist.userIds.map((oneuser, i) => (
    <div key={i}>
      <label>
        <span className="Leaderboard-Center">
          <Player user={oneuser} />
        </span>
      </label>
    </div>
  ));
};

export default PlayerList;
