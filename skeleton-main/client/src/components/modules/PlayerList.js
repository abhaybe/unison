import React, { useState, useEffect } from "react";
// import Player from "./Player";
// import Leaderboard from "../pages/Playerboard";
import Player from "./Player";
// import "./Player.css";
import { socket } from "../../client-socket.js";

const PlayerList = ({ playerlist }) => {
  const [userlist, setList] = useState([{}]);

  useEffect(() => {
    setList(playerlist.userIds);
  });

  useEffect(() => {
    socket.on("lobbySocket", (data) => {
      setList(...userlist, data);
      // userlist = [...new Set(userlist)];
      // setList((userlist) => new Set(userlist).add(data));
      //   if (trimmed && !categories.includes(trimmed)) {
      //     setCategories(prevState => prevState.concat(trimmed));
      //   }
      // };
    });
    return () => {
      socket.off("lobbySocket");
    };
  }, []);

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
