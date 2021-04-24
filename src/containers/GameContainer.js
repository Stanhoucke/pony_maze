import React from 'react';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {

    return (
        <>
            <h3>GameContainer</h3>
            <NewGame/>
            <Maze/>
            <EndGame/>
        </>
    )
}

export default GameContainer;