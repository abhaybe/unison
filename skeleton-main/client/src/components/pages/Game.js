import React from "react";
import Canvas from '../modules/Canvas.js'
import { Maze } from '../modules/Maze.js'

const Game = () => {

    return (
        <div>
            Hello this is the game
            <Canvas/>
            
            {/* <Maze x={10} y={10}/> */}
        </div>
    );
};
  
export default Game;