import React, { useEffect, useState } from "react";
import Canvas from "../modules/Canvas.js";
import { Maze } from "../modules/Maze.js";
import "./Game.css";
import { useNavigate } from "@reach/router";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import Timer from "../modules/Timer.js"

const Game = (props) => {
  if (!props.userId) {
    return (
      <div className="moveGame">
        <h1>Please log in to play U&Ison.</h1>
      </div>
    );
  }
  const [userLobby, setLobby] = useState("");
  var x = 1;
  console.log(props);
  const navigate = useNavigate();

  const callBack = (result) => {
    console.log("here")
    let userList = result.userList
    console.log(userList)
    userList.forEach((obj) => {
      if (obj === props.userId) {
        navigate("/lobby");

        if (x) {
          x = 0;
          post("/api/setLobbyNotPlaying", body).then(() => {
            console.log("isPlaying set to false");
          });
          post("/api/incrementWins", { userId: props.userId }).then(() => {
            console.log("wins");
          });
        }
      }
    })
    // get("/api/getuser", { userId: props.userId }).then((user) => {
    //   get("/api/lobby", { lobbyName: user.lobby }).then((lobby1) => {
    //     setLobby(lobby1.isPlaying);
    //     const body = { userId: props.userId, lobbyName: user.lobby };

        
    //     });
    //   });
    // });
  };

  useEffect(() => { 
    socket.on("gameResult", callBack);
    return () => {
      socket.off("gameResult", callBack)
    };
  }, []);

  return (
    <>
      <div className="centering">
        <Canvas userId={props.userId} />
      </div>
      <div className="finish-line"></div>
      <Timer userId={props.userId}></Timer>
    </>
  );
};

export default Game;
