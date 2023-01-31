import React from "react";
import Canvas from "../modules/Canvas.js";
import { Maze } from "../modules/Maze.js";
import "./Game.css";

const Game = (props) => {
  // console.log(props);
  // componentDidMount() {
  //   this.Canvas.focus();
  // }
  return (
    <>
      <div className="centering">
        <Canvas userId={props.userId} />
        {/* <Maze x={10} y={10}/> */}
        <div className="finished-list">
          <h1>Finished Players</h1>
        </div>
      </div>
      <div className="finish-line"></div>
    </>
  );
};

export default Game;
