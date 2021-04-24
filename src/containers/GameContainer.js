import { React, useState } from 'react';
import Request from '../helpers/Request';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {

    const [maze, setMaze] = useState({});
    const [loaded, setLoaded] = useState(false);

    const url = "https://ponychallenge.trustpilot.com/pony-challenge/maze/"

    const getMaze = (gameInfo) => {
        console.log("getting maze id...")

        const request = new Request();

        request.get(url, gameInfo)
        .then(data => setMaze(data))
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