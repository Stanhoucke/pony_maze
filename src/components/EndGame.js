import React from 'react';
import styled from 'styled-components';

const EndGameContainer = styled.div`
    #end-game-image {
        width: 50%;
    }

    .play-again-button {
        border-color: darkmagenta;
        color: darkmagenta;
        background: none;
        font-size: 0.66em;
        font-weight: bold;
        border-radius: 10px;
        border-style: solid;
        padding: 0.5em;
        cursor: pointer;
        margin: 2em 0em;
    }
    .play-again-button:hover {
        background-color: cyan;
    }

    @media only screen and (max-width: 768px) {
        /* For mobile phones: */
        #end-game-image {
            width: 80%;
        }
    }
`;

const EndGame = ({gameState, setGameState, ponyName}) => {

    const url = "https://ponychallenge.trustpilot.com"
    const gameResult = (gameState.state.toLowerCase() === "won") ?
            <h3>{ponyName} is free!</h3>
            :
            <h3>Oh no... Domokun caught {ponyName}!</h3>

    return (
        <EndGameContainer>
            {gameResult}
            <p>{gameState["state-result"]}.</p>
            <div id="end-game-image-container">
                <img id="end-game-image" src={`${url + gameState["hidden-url"]}`}/>
            </div>
            <button className="play-again-button" onClick={() => setGameState({state: "Inactive"})}>Play Again!</button>
        </EndGameContainer>
    )
}

export default EndGame;