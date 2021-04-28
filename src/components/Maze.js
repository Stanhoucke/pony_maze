import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './IconStyle.css';
import {getWallClasses} from '../models/MazeFunctions';
import {getEndPath} from '../models/FindExit';

const MazeWalls = styled.div`
display: flex;
flex-direction: column;
align-items:center;

#maze-walls {
    height: 50vh;
    width: 33%;
    padding: 1em 0;
    display: grid;
    grid-template-columns: repeat(${({ width }) => width}, 1fr);
    grid-template-rows: repeat(${({ height }) => height}, 1fr);
    font-size: 0.75vw;
}

#maze-walls > div {
    text-align: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}

.north {
    border-top: solid;
    border-color: darkgreen;
}
.west {
    border-left: solid;
    border-color: darkgreen;
}
.south {
    border-bottom: solid;
    border-color: darkgreen;
}
.east {
    border-right: solid;
    border-color: darkgreen;
}
.path {
    background-color: cyan;
}

.maze-object {
    margin: 0;
}
#pony {
    background-color: magenta;
}
#domokun {
    background-color: red;
}
#end-point {
    background-color: springgreen;
}

.material-icons{
    color: darkmagenta;
    font-size: 300%;
}

#direction-buttons {
    display: grid;
    grid-template-areas: 
    ". up ."
    "left . right"
    ". down .";
    padding-bottom: 2em;
}
#up-button{
    grid-area: up;
}
#left-button{
    grid-area: left;
}
#right-button{
    grid-area: right;
}
#down-button{
    grid-area: down;
}

#direction-buttons > button{
    cursor: pointer;
    background: none;
    border-radius: 10px;
    border-color: darkmagenta;
    border-style: solid;
}
#direction-buttons > button:hover {
    background-color: cyan;
}

.path-button {
    border-color: darkmagenta;
    color: darkmagenta;
    background: none;
    font-size: 0.66em;
    font-weight: bold;
    border-radius: 10px;
    border-style: solid;
    padding: 0.5em;
    cursor: pointer;
}
.path-button:hover {
    background-color: cyan;
}

#number-of-moves {
    margin-bottom: 0px;
}

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    #maze-walls {
        width: 80%;
        font-size: 0.33em;
    }
}
`;

const Maze = ({mazeState, ponyPosition, domokunPosition, endPointPosition, walls, movePony, ponyName}) => {
    const [endPath, setEndPath] = useState(null);
    
    useEffect(() => {
        window.addEventListener("keydown", handleArrowKeyPress);
        return () => {
          window.removeEventListener("keydown", handleArrowKeyPress);
        };
    }, []);

    const handleArrowKeyPress = (event) => {
        if (event.key === "ArrowUp") {
            movePony("north");
        } else if (event.key === "ArrowLeft") {
            movePony("west");
        } else if (event.key === "ArrowDown") {
            movePony("south");
        } else if (event.key === "ArrowRight") {
            movePony("east");
        }
    }    

    const colorExitPath = (index) => {
        if (endPath.includes(index)) {
            return " path"
        } else {
            return ""
        }
    }

    const getCellClassNames = (borders, index) => {
        if (!endPath){
            return getWallClasses(borders)
        } else {
            return getWallClasses(borders) + colorExitPath(index)
        }
    }
    
    const mazeCells = walls.map((borders, index) => {
        if (index === ponyPosition) {
            return (
                <div id="pony" key={index} className={getWallClasses(borders)}>
                    <p className="maze-object">P</p>
                </div>
            )
        } else if (index === domokunPosition) {
            return (
                <div id="domokun" key={index} className={getWallClasses(borders)}>
                    <p className="maze-object">D</p>
                </div>
            )
        } else if (index === endPointPosition) {
            return (
                <div id="end-point" key={index} className={getWallClasses(borders)}>
                    <p className="maze-object">E</p>
                </div>
            )
        } else {
            return (
                <div key={index} className={getCellClassNames(borders, index)}></div>
            )
        }
    });

    return (
        <MazeWalls width={mazeState.size[0]} height={mazeState.size[1]}>
            <article id="instructions">
                <p>Guide <strong>{ponyName}</strong> (<span id="pony">P</span>)to the exit (<span id="end-point">E</span>). Beware of the Domokun! (<span id="domokun">D</span>)</p>
                <p>Use the direction buttons or the arrow keys to navigate.</p>
            </article>

            <div id="find-path-buttons">
                <button className="path-button" onClick={() => setEndPath(getEndPath(endPointPosition, ponyPosition, walls, mazeState.size[0], mazeState.size[1]))}>Show Path to Exit</button>
                {endPath ? <p id="number-of-moves" ><strong>{ponyName}</strong> is {endPath.length - 1} moves from safety!</p> : <></>}
            </div>

            <div id="maze-walls">
                {mazeCells}
            </div>

            <div id="direction-buttons">
                <button id ="up-button" onClick={() => movePony("north")}><span className="material-icons">arrow_upward</span></button>
                <button id ="right-button" onClick={() => movePony("east")}><span className="material-icons">arrow_forward</span></button>
                <button id ="left-button" onClick={() => movePony("west")}><span className="material-icons">arrow_back</span></button>
                <button id ="down-button" onClick={() => movePony("south")}><span className="material-icons">arrow_downward</span></button>
            </div>
        </MazeWalls>
    )
}

export default Maze;