import React from "react";
import Maze from '../modules/Maze.js'

const Game = () => {

    return (
        <div>
            Hello this is the game
            <Maze x={10} y={10}/>
        </div>
    );
};
  
export default Game;