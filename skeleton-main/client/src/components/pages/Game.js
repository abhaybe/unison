import React from "react";
import Canvas from "../modules/Canvas.js";
import { Maze } from "../modules/Maze.js";

const Game = () => {
  return (
    <div className="centering">
      <Canvas />
      Hello this is the game
      {/* <Maze x={10} y={10}/> */}
      <div>
        <button>Start Game</button>
      </div>
    </div>
  );
};

export default Game;
