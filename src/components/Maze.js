import React from 'react';
import styled from 'styled-components';

const MazeWalls = styled.div`
width: 33%;
display: grid;
grid-template-columns: repeat(${({ height }) => height}, 1fr);
grid-template-rows: repeat(${({ width }) => width}, 1fr);
border: solid;

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
`;

const Maze = ({mazeState, ponyPosition, domokunPosition, endPointPosition, walls, loaded}) => {

        // Create maze space component to style divs (iterate through borders)
        // or create function to return classNames <- could resolve border cases too

        const addMazeBorder = (index, height, width, border) => {

            // SE corner
            // Modulo width is 0 and Index is greater than height x width - width
                // Push east and south to border
            if ((index + 1) % width === 0 && index >= (height * width) - width) {
                border.push("east")
                border.push("south")
            }

            // East border
            // Modulo width is 0
                // Push east to border

            // South border
            // Index is greater than height x width - width
                // Push south to border

        }

        const mazeCells = walls.map((borders, index) => {
            if (index === ponyPosition) {
                return (
                    <div key={index} className={borders}>
                        <p>P</p>
                    </div>
                )
            } else if (index === domokunPosition) {
                return (
                    <div key={index} className={borders}>
                        <p>D</p>
                    </div>
                )
            } else if (index === endPointPosition) {
                return (
                    <div key={index} className={borders}>
                        <p>E</p>
                    </div>
                )
            } else {
                return (
                    <div key={index} className={borders}></div>
                )
            }
        });

    if (!loaded) {
        return (
            <h1>Click new game</h1>
        )
        
    } else {
    
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
            </>
        )
        
    }

}

export default Maze;