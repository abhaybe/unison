import React from 'react'
import {createMaze} from "./Maze.js"

// https://css-tricks.com/using-requestanimationframe-with-react-hooks/
class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef(null)
        this.state = {coordinates: [50, 100], velocity: [0, 0]}
        this.animate = this.animate.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.draw_walls = this.draw_walls.bind(this)
        this.walls = createMaze();
        this.maxx = this.walls[0].length
        this.maxy = this.walls[0][0].length
        this.unit = 50
        this.width = this.maxx*50
        this.height = this.maxy*50
        this.state = {coordinates: [25, this.height-25], velocity: [0, 0]}
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowUp':
                this.setState({velocity:[0, 0]})
                // setVelocity([0, 0]);
                break;
            default:
                break;
        }
    }

    handleKeyDown(event){
        // this.setState({"velocity" : [-1000,50]})
        // console.log(this.state.velocity)
        switch (event.key) {
            case 'ArrowLeft':
                // console.log("here")
                this.setState({"velocity" : [-1,0]})
                // console.log(this.state.velocity)
                break;
            case 'ArrowRight':
                this.setState({"velocity" : [1,0]})
                break;
            case 'ArrowDown':
                this.setState({"velocity" : [0,1]})
                break;
            case 'ArrowUp':
                this.setState({"velocity" : [0,-1]})
                break;
            default:
                console.log(`Unknown key: ${event.key}`);
        }
    }

    draw_walls(ctx){
        for (let i = 0; i < this.maxx; i++){
            for (let j = 0; j < this.maxy; j++){
                if (this.walls[0][i][j]){
                    ctx.beginPath();
                    ctx.moveTo(this.unit*i, this.height - this.unit*(j+1));
                    ctx.lineTo(this.unit*(i+1), this.height - this.unit*(j+1));
                    ctx.stroke();
                }
                if (this.walls[1][i][j]){
                    ctx.beginPath();
                    ctx.moveTo(this.unit*(i+1), this.height - this.unit*(j));
                    ctx.lineTo(this.unit*(i+1), this.height - this.unit*(j+1));
                    ctx.stroke();
                }
                
            }
        }
        
    }

    animate(time){
        // this.setState(prev=>({"velocity": [0, 100]}))
        // console.log(this.state.velocity)
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath()
        ctx.arc(this.state.coordinates[0], this.state.coordinates[1], 20, 0, 2*Math.PI)
        ctx.fill()
        this.draw_walls(ctx)
        // console.log(this.state.velocity)
        // this.setState(prev => ({"velocity" : this.state.velocity}))
        this.setState(prev => ({"coordinates" : [prev.coordinates[0]+prev.velocity[0], prev.coordinates[1] + prev.velocity[1]],
                                "velocity" : [prev.velocity[0], prev.velocity[1]]}))
        requestAnimationFrame(this.animate);
    };

    
    componentDidMount(){
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        requestAnimationFrame(this.animate);
    }

    render(){
        return <div>
            <canvas ref={this.canvasRef} width={this.width} height={this.height} tabIndex={-1} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
        </div>
    }
}

  

export default Canvas