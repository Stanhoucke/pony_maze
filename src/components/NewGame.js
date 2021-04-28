import { React, useState } from 'react';
import styled from 'styled-components';

const NewGameStyle = styled.div`
#new-game-setup {
    padding: 1em 0 2em 0;
}


#new-game-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.form-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.form-item > label {
    align-self: flex-start;
}

.form-item > input, .form-item > select {
    font-size: 1em;
    border-radius: 10px;
    border-style: solid;
    border-width: thin;
    margin-top: 0.25em;
    margin-bottom: 1em;
}
.form-item > button {
    border-color: darkmagenta;
    color: darkmagenta;
    background: none;
    font-size: 1em;
    font-weight: bold;
    border-radius: 10px;
    border-style: solid;
    border-width: thick;
    padding: 0.5em;
}

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .form-item {
        width: 80%;
    }
}
`;

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
        <NewGameStyle>
            <article id="story">
                <p>A pony is trapped in a maze guarded by a fierce monster!</p>
                <p>Mesmerised by a rainbow in the distance, the pony has unknowingly wandered far from Ponyville straight into the Domokun Maze!</p>
                <p>Can you guide her to safety?</p>
            </article>
            <div id="new-game-setup">
                <h3>Setup New Game</h3>
                <form id="new-game-form" onSubmit={handleNewGame}>
                    <div className="form-item">
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
                    </div>
                    <div className="form-item">
                        <label htmlFor="maze-width">Maze width (15 - 25):</label>
                        <input type="number" id="maze-width" name="maze-width" min="15" max="25" value={width} onChange={handleWidthChange}/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="maze-height">Maze height (15 - 25):</label>
                        <input type="number" id="maze-height" name="maze-height" min="15" max="25" value={height} onChange={handleHeightChange}/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="maze-difficulty">Difficulty (0 - 10):</label>
                        <input type="number" id="maze-difficulty" name="maze-difficulty" min="0" max="10" value={difficulty} onChange={handleDifficultyChange}/>
                    </div>
                    <div className="form-item">
                        <button type="submit" name="new-game-button">New Game</button>
                    </div>
                </form>
            </div>
        </NewGameStyle>
    )
}

export default NewGame;