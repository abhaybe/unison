import React, { useState, useEffect } from "react";
import Leader from "./Leader";
import Leaderboard from "../pages/Leaderboard";
import "./Leader.css";
const LeaderList = (props) => {
  return props.users.map((oneuser, i) => (
    <div>
      <bob>
        <bob1>
          <Leader key={i} user={oneuser} />
        </bob1>
      </bob>
    </div>
  ));
};

export default LeaderList;
