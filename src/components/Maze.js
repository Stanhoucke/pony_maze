import React from 'react';

const Maze = ({mazeState, ponyPosition, domokunPosition, endPointPosition, walls}) => {

    return (
        <>
            <h3>Maze</h3>
            <ul>
                <li>Pony: {ponyPosition}</li>
                <li>Domokun: {domokunPosition}</li>
                <li>Exit: {endPointPosition}</li>
            </ul>
        </>
    )
}

export default Maze;