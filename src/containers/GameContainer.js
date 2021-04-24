import React from 'react';
import Request from './helpers/Request';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {

    const [maze, setMaze] = useState({});
    const [loaded, setLoaded] = useState(false);

    const url = "https://ponychallenge.trustpilot.com/pony-challenge/maze/"

    

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