import { React, useEffect, useRef, useState } from 'react';
import Request from '../helpers/Request';
import {updateAllWalls} from '../models/MazeFunctions';
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
    const [gameState, setGameState] = useState({state: "Inactive"});
    const [ponyName, setPonyName] = useState(false);

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
        .then(data => {
            setMazeId(data.maze_id)
        })
        .then(() => setPonyName(gameInfo["maze-player-name"]))
    }
    
    const getMazeState = () => {
        console.log("getting maze state...")
        
        request.get(url + '/' + mazeId)
        .then(data => {
            setMazeState(data)
            setPonyPosition(data.pony[0])
            setDomokunPosition(data.domokun[0])
            setEndPointPosition(data["end-point"][0])
            setWalls(updateAllWalls(data.data, data.size[0], data.size[1]))
            setGameState(data["game-state"])
        })
    }

    const movePony = (direction) => {
        console.log("moving pony...")

        const move = {
            "direction": direction
        }

        request.post(url + '/' + mazeId, move)
        .then(data => setGameState(data))
        .then(() => getMazeState())
    }

    let content;
    {if (gameState.state === "Inactive") {
        content = <NewGame getMazeId = {getMazeId}/>
    } else if (gameState.state.toLowerCase() === "active") {
        content = <Maze
            mazeState = {mazeState}
            ponyPosition = {ponyPosition}
            domokunPosition = {domokunPosition}
            endPointPosition = {endPointPosition}
            walls = {walls}
            movePony = {movePony}
            ponyName = {ponyName}
        />
    } else {
        content = <EndGame gameState = {gameState} setGameState = {setGameState}/>
    }}
    return (
        <>
            {content}
        </>
    )
}

export default GameContainer;