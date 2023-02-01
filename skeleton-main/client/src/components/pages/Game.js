import React, { useEffect } from "react";
import Canvas from "../modules/Canvas.js";
import { Maze } from "../modules/Maze.js";
import "./Game.css";
import { useNavigate } from "@reach/router";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";

const Game = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const callBack = (userList, lobbyt) => {
    const body = { userId: props.userId, lobbyName: lobbyt };

    console.log("hiiii");

    userList.forEach((obj) => {
      post("/api/incrementWins", body).then(() => {
        console.log("wins");
      });
      console.log(obj, props.userId);
      if (obj === props.userId) {
        navigate("/lobby");
      }
    });
  };

  // useEffect(() => {
  //   const callBack = (userList) => {
  //     console.log("hiiii");
  //     userList.forEach((obj) => {
  //       console.log(obj, props.userId);
  //       if (obj === props.userId) {
  //         navigate("/lobby");
  //       }
  //     });

  //     socket.on("gameWon", callBack);
  //   };
  //   return () => {
  //     socket.off("gameWon", callBack);
  //   };
  // });

  useEffect(() => {
    socket.on("gameWon", callBack);
    return () => {
      socket.off("gameWon", callBack);
    };
  });

  return (
    <>
      <div className="centering">
        <Canvas userId={props.userId} />
      </div>
      <div className="">
        <h1>Finished Players</h1>
      </div>
      <div className="finish-line"></div>
    </>
  );
};

export default Game;
