import React from 'react';
import styled from 'styled-components';
import {getWallClasses} from '../models/MazeFunctions';

const MazeWalls = styled.div`
width: 33%;
display: grid;
grid-template-columns: repeat(${({ height }) => height}, 1fr);
grid-template-rows: repeat(${({ width }) => width}, 1fr);

div {
    height: 3em;
    text-align: center;
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
`;

const Maze = ({mazeState, ponyPosition, domokunPosition, endPointPosition, walls, movePony, loaded}) => {
    if (!loaded) {
        return (
            <h1>Click new game</h1>
        )
        
    } else {
        const mazeCells = walls.map((borders, index) => {
            if (index === ponyPosition) {
                return (
                    <div key={index} className={getWallClasses(borders)}>
                        <p>P</p>
                    </div>
                )
            } else if (index === domokunPosition) {
                return (
                    <div key={index} className={getWallClasses(borders)}>
                        <p>D</p>
                    </div>
                )
            } else if (index === endPointPosition) {
                return (
                    <div key={index} className={getWallClasses(borders)}>
                        <p>E</p>
                    </div>
                )
            } else {
                return (
                    <div key={index} className={getWallClasses(borders)}></div>
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
                    {/* <li>Size: {mazeState.size[0]} x {mazeState.size[1]}</li> */}
                </ul>

                <MazeWalls
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