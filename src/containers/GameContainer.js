import { React, useState } from 'react';
import Request from '../helpers/Request';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {

    const [mazeId, setMazeId] = useState({});
    const [loaded, setLoaded] = useState(false);

    const url = "https://ponychallenge.trustpilot.com/pony-challenge/maze"

    const getMaze = (gameInfo) => {
        console.log("getting maze id...")

        const request = new Request();

        request.post(url, gameInfo)
        .then(data => setMazeId(data.maze_id))
        .then(() => setLoaded(true))
    }

    return (
        <>
            <h3>GameContainer</h3>
            <NewGame getMaze = {getMaze}/>
            <Maze/>
            <EndGame/>
        </>
    )
}

export default GameContainer;