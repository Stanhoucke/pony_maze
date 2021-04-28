import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {getWallClasses} from '../models/MazeFunctions';
import {getEndPath} from '../models/FindExit';

const MazeWalls = styled.div`
height: 50vh;
width: 33%;
display: grid;
grid-template-columns: repeat(${({ width }) => width}, 1fr);
grid-template-rows: repeat(${({ height }) => height}, 1fr);

div {

    text-align: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}

.north {
    border-top: dashed;
}
.west {
    border-left: dashed;
}
.south {
    border-bottom: dashed;
}
.east {
    border-right: dashed;
}
.path {
    background-color: cyan;
}

.maze-object {
    margin: 0;
}
`;

const Maze = ({mazeState, ponyPosition, domokunPosition, endPointPosition, walls, movePony, loaded}) => {
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
    
    if (!loaded) {
        return (
            <h1>Click new game</h1>
        )
        
    } else {
        const mazeCells = walls.map((borders, index) => {
            if (index === ponyPosition) {
                return (
                    <div key={index} className={getWallClasses(borders)}>
                        <p className="maze-object">P</p>
                    </div>
                )
            } else if (index === domokunPosition) {
                return (
                    <div key={index} className={getWallClasses(borders)}>
                        <p className="maze-object">D</p>
                    </div>
                )
            } else if (index === endPointPosition) {
                return (
                    <div key={index} className={getWallClasses(borders)}>
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
            <>
                <h3>Maze</h3>
                <ul>
                    <li>Pony: {ponyPosition}</li>
                    <li>Domokun: {domokunPosition}</li>
                    <li>Exit: {endPointPosition}</li>
                </ul>

                <button onClick={() => setEndPath(getEndPath(endPointPosition, ponyPosition, walls, mazeState.size[0], mazeState.size[1]))}>Show Path to Exit</button>
                {endPath ? <p>{endPath.length - 1} moves to the rainbow!</p> : <></>}

                <MazeWalls id="maze-walls"
                width={mazeState.size[0]}
                height={mazeState.size[1]}
                >
                    {mazeCells}
                </MazeWalls>

                <button onClick={() => movePony("north")}>Up</button>
                <button onClick={() => movePony("east")}>Right</button>
                <button onClick={() => movePony("west")}>Left</button>
                <button onClick={() => movePony("south")}>Down</button>
            </>
        )
        
    }

}

export default Maze;