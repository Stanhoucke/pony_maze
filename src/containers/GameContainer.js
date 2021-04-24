import { React, useEffect, useRef, useState } from 'react';
import Request from '../helpers/Request';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {

    const [mazeId, setMazeId] = useState("");
    const [mazeState, setMazeState] = useState({});
    const [loaded, setLoaded] = useState(false);

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            getMazeState();
        }
    }, [mazeId])

    const url = "https://ponychallenge.trustpilot.com/pony-challenge/maze"
    const request = new Request();

    const getMazeId = (gameInfo) => {
        console.log("getting maze id...")

        request.post(url, gameInfo)
        .then(data => setMazeId(data.maze_id))
    }
    
    const getMazeState = () => {
        console.log("getting maze state...")
        
        request.get(url + '/' + mazeId)
        .then(data => setMazeState(data))
        .then(() => setLoaded(true))
    }

    return (
        <>
            <h3>GameContainer</h3>
            Maze ID: {mazeId}
            <NewGame getMazeId = {getMazeId}/>
            <Maze/>
            <EndGame/>
        </>
    )
}

export default GameContainer;