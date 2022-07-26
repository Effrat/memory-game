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
        <div className='flex flex-col items-center'>
            <div>Game: {numberOfPairs}</div>
            <input
                type="range"
                min="1"
                max="20"
                value={numberOfPairs}
                onChange={e => setNumberOfPairs(e.target.value)}
                disabled={isActiveGame}
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