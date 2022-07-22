import { useState, useEffect } from "react"

import GameBoard from "./gameBoard"
import OuterScreen from "./outerScreen"


const Game = () => {

    const [isActiveGame, setIsActiveGame] = useState(false)
    const startGame = () => setIsActiveGame(true)
    const endGame = () => setIsActiveGame(false)

    const [numberOfPairs, setNumberOfPairs] = useState(10)

    useEffect(() => {
    }, [numberOfPairs])
    return (
        <div>
            <div>Game: {numberOfPairs}</div>
            <input
                type="range"
                min="1"
                max="20"
                value={numberOfPairs}
                onChange={e => setNumberOfPairs(e.target.value)}
            />
            {
                isActiveGame 
                ? <GameBoard endGame={endGame} numberOfPairs={numberOfPairs} />
                : <OuterScreen startGame={startGame} />
            }
        </div>
    );
}
 
export default Game;