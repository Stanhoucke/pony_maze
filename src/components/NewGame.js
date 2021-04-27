import { React, useState } from 'react';

const NewGame = ({getMazeId}) => {
    const [width, setWidth] = useState(15);
    const [height, setHeight] = useState(15);
    const [difficulty, setDifficulty] = useState(0);
    const [pony, setPony] = useState("Spike");

    const handleWidthChange = (event) => {
        setWidth(parseInt(event.target.value));
    }
    const handleHeightChange = (event) => {
        setHeight(parseInt(event.target.value));
    }
    const handleDifficultyChange = (event) => {
        setDifficulty(parseInt(event.target.value));
    }
    const handlePonyChange = (event) => {
        setPony(event.target.value);
    }

    const handleNewGame = (event) => {
        event.preventDefault();

        const newGameInfo = {
            "maze-width": width,
            "maze-height": height,
            "maze-player-name": pony,
            "difficulty": difficulty
        }
        getMazeId(newGameInfo);
    }

    return (
        <>
            <h3>NewGame</h3>
            <form onSubmit={handleNewGame}>
                <label htmlFor="pony-name">Pony:</label>
                <select id="pony-name" name="pony-name" value={pony} onChange={handlePonyChange}>
                    <option value="Spike" >Spike</option>
                    <option value="Princess Luna">Princess Luna</option>
                    <option value="Rarity">Rarity</option>
                    <option value="Rainbow Dash">Rainbow Dash</option>
                    <option value="Big McIntosh">Big McIntosh</option>
                    <option value="Pinkie Pie">Pinkie Pie</option>
                    <option value="Applejack">Applejack</option>
                </select>
                <label htmlFor="maze-width">Maze width:</label>
                <input type="number" id="maze-width" name="maze-width" min="15" max="25" value={width} onChange={handleWidthChange}/>
                <label htmlFor="maze-height">Maze height:</label>
                <input type="number" id="maze-height" name="maze-height" min="15" max="25" value={height} onChange={handleHeightChange}/>
                <label htmlFor="maze-difficulty">Difficulty:</label>
                <input type="number" id="maze-difficulty" name="maze-difficulty" min="0" max="10" value={difficulty} onChange={handleDifficultyChange}/>

                <button type="submit" name="new-game">New Game</button>
            </form>
        </>
    )
}

export default NewGame;