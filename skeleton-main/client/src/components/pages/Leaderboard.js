import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import LeaderList from "../modules/LeaderList";
// import { get } from "mongoose";
import { get } from "../../utilities";

const Leaderboard = () => {
  const [Leaders, setLeaders] = useState([]);

  useEffect(() => {
    get("/api/scores").then((leaders) => {
      setLeaders(leaders);
    });
  }, []);

  return (
    <>
      <h1>Global Leaderboard</h1>
      <LeaderList users={Leaders} />
    </>
  );
};

export default Leaderboard;
