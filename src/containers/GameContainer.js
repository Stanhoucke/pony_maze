import { React, useEffect, useRef, useState } from 'react';
import Request from '../helpers/Request';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {

    const [mazeId, setMazeId] = useState("");
    const [mazeState, setMazeState] = useState({});
    const [ponyPosition, setPonyPosition] = useState(null);
    const [domokunPosition, setDomokunPosition] = useState(null);
    const [endPointPosition, setEndPointPosition] = useState(null);
    const [walls, setWalls] = useState(null);
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
        .then(data => {
            setMazeState(data)
            setPonyPosition(data.pony[0])
            setDomokunPosition(data.domokun[0])
            setEndPointPosition(data["end-point"][0])
            setWalls(data.data)
        })
        .then(() => setLoaded(true))
    }

    return (
        <>
            <h3>GameContainer</h3>
            Maze ID: {mazeId}
            <NewGame getMazeId = {getMazeId}/>
            <Maze
                mazeState = {mazeState}
                ponyPosition = {ponyPosition}
                domokunPosition = {domokunPosition}
                endPointPosition = {endPointPosition}
                walls = {walls}
                loaded = {loaded}
            />
            <EndGame/>
        </>
    )
}

export default GameContainer;