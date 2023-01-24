import React from "react";
import Canvas from '../modules/Canvas.js'
import { Maze } from '../modules/Maze.js'

const Game = () => {

    return (
        <div>
            <Canvas/>
            Hello this is the game
            <Maze x={10} y={10}/>
        </div>
    );
};
  
export default Game;