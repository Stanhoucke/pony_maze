import { React, useState } from 'react';

const NewGame = ({getMaze}) => {

    const [gameInfo, setGameInfo] = useState(
        {
            "maze-width": 15,
            "maze-height": 15,
            "maze-player-name": "Spike",
            "difficulty": 0
        }
    );

    const handleNewGame = (event) => {
        event.preventDefault();
        getMaze(gameInfo);
    }

    return (
        <>
            <h3>NewGame</h3>
            <form onSubmit={handleNewGame}>
                <button type="submit">New Game</button>
            </form>
        </>
    )
}

export default NewGame;