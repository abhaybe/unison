import React, { useState, useEffect } from "react";
import Leader from "./Leader";
import Leaderboard from "../pages/Leaderboard";
import "./Leader.css";
const LeaderList = (props) => {
  return props.users.map((oneuser, i) => (
    <div key={i}>
      <label>
        <span className="Leaderboard-Center">
          <Leader user={oneuser} />
        </span>
      </label>
    </div>
  ));
};

export default LeaderList;
