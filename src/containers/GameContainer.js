import { React, useEffect, useRef, useState } from 'react';
import Request from '../helpers/Request';
import {updateAllWalls} from '../models/MazeFunctions';
import {getEndPath} from '../models/FindExit';
import NewGame from '../components/NewGame';
import Maze from '../components/Maze';
import EndGame from '../components/EndGame';

const GameContainer = () => {
    const [mazeId, setMazeId] = useState("");
    const [mazeSize, setmazeSize] = useState({});
    const [ponyPosition, setPonyPosition] = useState(null);
    const [domokunPosition, setDomokunPosition] = useState(null);
    const [endPointPosition, setEndPointPosition] = useState(null);
    const [walls, setWalls] = useState(null);
    const [gameState, setGameState] = useState({state: "Inactive"});
    const [ponyName, setPonyName] = useState(false);
    const [endPath, setEndPath] = useState(null);
    const [startAutoFindExit, setStartAutoFindExit] = useState(false);

    const initialRender = useRef(true);
    const initialRenderAutoMove = useRef(true);

    const url = "https://ponychallenge.trustpilot.com/pony-challenge/maze"
    const request = new Request();

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            getMazeState();
        }
    }, [mazeId])
    useEffect(() => {
        if (startAutoFindExit){
            if (gameState.state.toLowerCase() !== "active") {
                setStartAutoFindExit(false);
            } else {
                let path = getEndPath(endPointPosition, ponyPosition, walls, mazeSize[0], mazeSize[1]);
                autoFindExit(path); 
            }
        } 
    }, [domokunPosition])
    useEffect(() => {
        if (initialRenderAutoMove.current) {
            initialRenderAutoMove.current = false;
        } else {
            movePony("north");
        }
    }, [startAutoFindExit])

    const getMazeId = (gameInfo) => {
        request.post(url, gameInfo)
        .then(data => {
            setMazeId(data.maze_id)
        })
        .then(() => setPonyName(gameInfo["maze-player-name"]))
    }
    
    const getMazeState = () => {
        request.get(url + '/' + mazeId)
        .then(data => {
            setmazeSize(data.size)
            setPonyPosition(data.pony[0])
            setDomokunPosition(data.domokun[0])
            setEndPointPosition(data["end-point"][0])
            setWalls(updateAllWalls(data.data, data.size[0], data.size[1]))
            setGameState(data["game-state"])
        }).then(() => {
            if (gameState.state.toLowerCase() !== "active"){
                setEndPath(null);
            }
        })
    }

    const movePony = (direction) => {
        const move = {
            "direction": direction
        }

        request.post(url + '/' + mazeId, move)
        .then(data => setGameState(data))
        .then(() => getMazeState())
    }

    const handleGetEndPath = () => {
        setEndPath(getEndPath(endPointPosition, ponyPosition, walls, mazeSize[0], mazeSize[1]))
    }

    const autoFindExit = async (path) => {
        const mazeWidth = mazeSize[0];
        let nextMoveValue = path[0] - path[1];
        if (nextMoveValue === 1){
            await movePony("west");
        } else if (nextMoveValue === mazeWidth){
            await movePony("north");
        } else if (nextMoveValue === -1){
            await movePony("east");
        } else if (nextMoveValue === (mazeWidth * -1)){
            await movePony("south");
        }
    }

    let content;
    {if (gameState.state === "Inactive") {
        content = <NewGame getMazeId = {getMazeId}/>
    } else if (gameState.state.toLowerCase() === "active") {
        content = <Maze
            mazeSize = {mazeSize}
            ponyPosition = {ponyPosition}
            domokunPosition = {domokunPosition}
            endPointPosition = {endPointPosition}
            walls = {walls}
            movePony = {movePony}
            ponyName = {ponyName}
            endPath = {endPath}
            handleGetEndPath = {handleGetEndPath}
            setStartAutoFindExit = {setStartAutoFindExit}
        />
    } else {
        content = <EndGame
            gameState = {gameState}
            setGameState = {setGameState}
            ponyName = {ponyName}
        />
    }}
    return (
        <>
            {content}
        </>
    )
}

export default GameContainer;