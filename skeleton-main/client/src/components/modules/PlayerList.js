import React, { useState, useEffect } from "react";
import Leader from "./Player";
import Leaderboard from "../pages/Playerboard";
import "./Player.css";
const PlayerList = (props) => {
  return props.users.map((oneuser, i) => (
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
