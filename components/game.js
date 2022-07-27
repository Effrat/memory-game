import { useState, useEffect } from "react"

import GameBoard from "./gameBoard"
import OuterScreen from "./outerScreen"


const Game = () => {

    const [isActiveGame, setIsActiveGame] = useState(false)
    const [totalSecondsActive, setTotalSecondsActive] = useState(0)
    const [totalGameTime, setTotalGameTime] = useState({
        seconds: 0,
        minutes: 0,
        hours: 0,
    })
    const startGame = () => setIsActiveGame(true)
    

    const [numberOfPairs, setNumberOfPairs] = useState(10)

    useEffect(() => {
        if (isActiveGame) {
            let secondsCounter = setInterval(
                () => {
                    setTotalSecondsActive(prevTotalSecondsActive => prevTotalSecondsActive + 1)
                },
                1000
            )
            return () => clearInterval(secondsCounter)
        } else {
            setTotalSecondsActive(0)
        }
    }, [isActiveGame])

    useEffect(() => {
        let seconds = `00${totalSecondsActive % 60}`.slice(-2)
        let minutes = `00${(Math.floor(totalSecondsActive / 60) % 60)}`.slice(-2)
        let hours = `00${Math.floor(totalSecondsActive / 3600)}`.slice(-2)
        setTotalGameTime({
            seconds,
            minutes,
            hours,
        })
    }, [totalSecondsActive])

    useEffect(() => {
    }, [numberOfPairs])
    return (
        <div className='text-center'>
            
            
            { isActiveGame
            ? 
                <div>
                    <GameBoard
                        numberOfPairs={numberOfPairs}
                        totalGameTime={totalGameTime}
                        setTotalSecondsActive={setTotalSecondsActive}
                        setIsActiveGame={setIsActiveGame}
                    />
                </div>
            :
                <div className='text-center'>
                    <label htmlFor='pairs'>Pairs: </label>
                    <input
                    name='pairs'
                        type="range"
                        min="1"
                        max="20"
                        value={numberOfPairs}
                        onChange={e => setNumberOfPairs(e.target.value)}
                        disabled={isActiveGame}
                    />
                    <div> {numberOfPairs}</div>
                    <OuterScreen startGame={startGame} />
                </div>
            }
        </div>
    );
}
 
export default Game;