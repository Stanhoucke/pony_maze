import React from 'react';

const EndGame = ({gameState, setGameState}) => {

    const url = "https://ponychallenge.trustpilot.com"

    return (
        <>
            <h3>EndGame</h3>
            <p>{gameState["state-result"]}</p>
            <button onClick={() => setGameState({state: "Inactive"})}>Play Again</button>
            <img src={`${url + gameState["hidden-url"]}`}/>
        </>
    )
}

export default EndGame;