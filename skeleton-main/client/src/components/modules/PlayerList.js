import React, { useState, useEffect } from "react";
// import Player from "./Player";
// import Leaderboard from "../pages/Playerboard";
import Player from "./Player";
// import "./Player.css";
import { socket } from "../../client-socket.js";

const PlayerList = ({ playerlist }) => {
  // console.log(userlist);
  // useEffect(() => {
  //   setList([]);
  //   playerlist.userIds.forEach((obj) => {
  //     setList([...userlist, obj]);
  //     console.log(obj);
  //   });
  // });

  // useEffect(() => {
  //   socket.on("lobbySocket", (data) => {
  //     console.log("please work", userlist, String(data));
  //     setList([...userlist, data]);
  //     console.log(userlist);
  //     // setList(Array(new Set(userlist)));
  //     // userlist = [...new Set(userlist)];
  //     // setList((userlist) => new Set(userlist).add(data));
  //     //   if (trimmed && !categories.includes(trimmed)) {
  //     //     setCategories(prevState => prevState.concat(trimmed));
  //     //   }
  //     // };
  //   });
  //   return () => {
  //     socket.off("lobbySocket");
  //   };
  // }, []);
  console.log(playerlist);
  playerlist = playerlist.filter((obj) => {
    return obj !== "";
  });
  return playerlist.map((oneuser, i) => (
    <div key={i * Math.random()}>
      {/* {oneuser} */}
      <label>
        <span className="Leaderboard-Center">
          <Player user={oneuser} />
        </span>
      </label>
    </div>
  ));
};

export default PlayerList;
