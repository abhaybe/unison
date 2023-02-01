import React from "react";
import { createMaze } from "./Maze.js";
import { socket } from "../../client-socket.js";
import "./Canvas.css";
// import { TrapFocus } from "@mui/base";

// https://css-tricks.com/using-requestanimationframe-with-react-hooks/
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef(null);
    this.animationFrameId = React.createRef(null);
    this.state = { coordinates: [50, 100], velocity: [0, 0] };
    this.animate = this.animate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleActionStart = this.handleActionStart.bind(this);
    this.handleActionEnd = this.handleActionEnd.bind(this);
    this.draw_walls = this.draw_walls.bind(this);
    this.walls = createMaze();
    this.circleRadius = 10;
    this.maxx = this.walls[0].length;
    this.maxy = this.walls[0][0].length;
    this.unit = Math.floor(Math.min(window.innerHeight, window.innerWidth) / 13);
    this.width = this.maxx * this.unit;
    this.height = this.maxy * this.unit;
    this.state = { coordinates: [25, this.height - 25], velocity: [0, 0] };
    this.won = 0;
  }

  handleKeyUp(event) {
    event.preventDefault();
    socket.emit("serverEndMove", { user: this.props.userId, action: event.key });
  }

  handleKeyDown(event) {
    // console.log("hi", this.props)
    event.preventDefault();
    socket.emit("serverStartMove", { user: this.props.userId, action: event.key });
  }

  handleActionStart(data) {
    // console.log(this.props)
    if (data[0] !== this.props.userId) return;
    switch (data[1]) {
      case "left":
        this.setState({ velocity: [-2, 0] });
        // console.log(this.state.velocity)
        break;
      case "right":
        this.setState({ velocity: [2, 0] });
        break;
      case "down":
        this.setState({ velocity: [0, 2] });
        break;
      case "up":
        this.setState({ velocity: [0, -2] });
        break;
    }
  }

  handleActionEnd(data) {
    if (data[0] !== this.props.userId) return;
    this.setState({ velocity: [0, 0] });
  }

  draw_walls(ctx) {
    for (let i = 0; i < this.maxx; i++) {
      for (let j = 0; j < this.maxy; j++) {
        if (this.walls[0][i][j]) {
          ctx.beginPath();
          ctx.moveTo(this.unit * i, this.height - this.unit * (j + 1));
          ctx.lineTo(this.unit * (i + 1), this.height - this.unit * (j + 1));
          ctx.stroke();
        }
        if (this.walls[1][i][j]) {
          ctx.beginPath();
          ctx.moveTo(this.unit * (i + 1), this.height - this.unit * j);
          ctx.lineTo(this.unit * (i + 1), this.height - this.unit * (j + 1));
          ctx.stroke();
        }
      }
    }
  }

  canMove(ctx) {
    let x = Math.floor(this.state.coordinates[0] / this.unit);
    let y = Math.floor((this.height - this.state.coordinates[1]) / 50);
    let velocity = this.state.velocity;
    let walls = this.walls;
    // check if out of bounds
    if (velocity[1] == -2 && (walls[0][x][y] || y == this.maxy - 1)) {
      if (this.state.coordinates[1] < 10) return false;
    }
    if (velocity[0] == 2 && (walls[1][x][y] || x == this.maxx - 1)) {
      if (this.width - this.state.coordinates[0] < 10) return false;
    }
    if (velocity[1] == 2 && ((y - 1 >= 0 && walls[0][x][y - 1]) || y == 0)) {
      if (this.height - this.state.coordinates[1] < 10) return false;
    }
    if (velocity[0] == -2 && ((x - 1 >= 0 && walls[1][x - 1][y]) || x == 0)) {
      if (this.state.coordinates[0] < 10) return false;
    }

    // check if hitting a wall
    x = this.state.coordinates[0] + this.state.velocity[0];
    y = this.state.coordinates[1] + this.state.velocity[1];
    let radius = this.circleRadius;
    var imageData = ctx.getImageData(x - radius, y - radius, radius * 2, radius * 2);
    var pixels = imageData.data;
    var w = imageData.width;
    var h = imageData.height;
    var l = w * h;
    // console.log(pixels.length);
    // ctx.putImageData(imageData, this.width - 20, 0);
    for (var i = 0; i < l; i++) {
      var r = pixels[i * 4]; // Red
      var g = pixels[i * 4 + 1]; // Green
      var b = pixels[i * 4 + 2]; // Blue
      var a = pixels[i * 4 + 3]; // Alpha

      // skip to next iteration if the alpha of this pixel is 0
      if (a == 0) {
        continue;
      }
      // console.log("hi", r, g, b, a);

      // get the position of this pixel
      let py = Math.floor(i / w);
      let px = i - py * w;
      // check for collision and exit is there is one
      if ((px - radius) * (px - radius) + (py - radius) * (py - radius) < radius * radius) {
        return false;
      }
    }
    return true;
  }

  didWin() {
    if (this.state.coordinates[0] >= this.width - 25 && this.state.coordinates[1] <= 25) {
      socket.emit("someonewon", this.props.userId);
      // this.win = 1;
      // console.log("helllo there");
    }
  }

  animate(time) {
    // this.setState(prev=>({"velocity": [0, 100]}))
    // console.log(this.state.velocity)
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, this.width, this.height);
    this.draw_walls(ctx);
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(this.width, this.height);
    ctx.stroke();
    // console.log(this.state.velocity)
    // this.setState(prev => ({"velocity" : this.state.velocity}))
    if (this.canMove(ctx)) {
      this.setState((prev) => ({
        coordinates: [
          prev.coordinates[0] + prev.velocity[0],
          prev.coordinates[1] + prev.velocity[1],
        ],
        velocity: [prev.velocity[0], prev.velocity[1]],
      }));
    }

    ctx.beginPath();
    ctx.arc(
      this.state.coordinates[0],
      this.state.coordinates[1],
      this.circleRadius,
      0,
      2 * Math.PI
    );
    ctx.fill();

    this.didWin();

    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    // canvas.focus();
    if (!canvas) return;
    this.animationFrameId = requestAnimationFrame(this.animate);
    socket.on("startMove", this.handleActionStart);
    socket.on("endMove", this.handleActionEnd);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    return (
      <div className="Center-Canvas">
        <canvas
          ref={this.canvasRef}
          width={this.width}
          height={this.height}
          tabIndex={0}
          autoFocus
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}

export default Canvas;
