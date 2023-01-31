import React from "react";
import "./Maze.css";

let dx = [0, 0, 1, -1];
let dy = [1, -1, 0, 0];

const Point = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(r) {
    return new Point(this.x + dx[r], this.y + dy[r]);
  }
  inbounds(x, y) {
    return this.x < x && this.y < y && this.x >= 0 && this.y >= 0;
  }
};

function randomPath(x, y, visited, dir) {
  let maxx = visited.length;
  let maxy = visited[0].length;
  let cur = new Point(x, y);
  while (!visited[cur.x][cur.y]) {
    let next = [];
    for (let r = 0; r < 4; r++) {
      if (cur.move(r).inbounds(maxx, maxy)) {
        next.push(r);
      }
    }
    let d = next[Math.floor(Math.random() * next.length)];
    dir[cur.x][cur.y] = d;
    cur = cur.move(d);
  }
}

export function createMaze(x = 10, y = 10) {
  let visited = Array.from(Array(x), () => Array(y).fill(false));
  let dir = Array.from(Array(x), () => Array(y).fill(false));
  let walls = Array.from(Array(2), () => Array.from(Array(x), () => Array(y).fill(true))); // first array is upper walls
  visited[0][0] = true;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (visited[i][j]) continue;
      randomPath(i, j, visited, dir);
      let cur = new Point(i, j);
      while (!visited[cur.x][cur.y]) {
        visited[cur.x][cur.y] = true;
        let d = dir[cur.x][cur.y];
        if (d % 2 == 1) cur = cur.move(d);
        walls[Math.floor(d / 2)][cur.x][cur.y] = false;
        if (d % 2 == 0) cur = cur.move(d);
      }
    }
  }
  return walls;
}

export const Maze = ({ x, y }) => {
  let walls = createMaze(x, y);
  let thick = 1;

  const getRow = (coord) => {
    coord = y - 1 - coord;
    let squares = Array(x);
    for (let i = 0; i < x; i++) {
      squares[i] = (
        <div
          className="square"
          key={coord * x + i}
          style={{
            borderTop: walls[0][i][coord] ? `${thick}px solid #999` : `${thick}px solid #fff`,
            // marginTop: (walls[0][i][coord]) ? "0px" : `${thick}px`,
            borderRight: walls[1][i][coord] ? `${thick}px solid #999` : `${thick}px solid #fff`,
            // marginRight: (walls[1][i][coord]) ? "0px" : `${thick}px`
            // borderLeft: walls[2][i][coord] ? `${thick}px solid #999` : `${thick}px solid #fff`,
          }}
        ></div>
      );
    }
    return (
      <div className="row" key={coord}>
        {squares}
      </div>
    );
  };

  let board = Array(y);
  for (let i = 0; i < y; i++) board[i] = getRow(i);
  return <div className="board">{board}</div>;
};
