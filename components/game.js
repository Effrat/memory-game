import { useState, useEffect } from 'react'

import GameBoard from './gameBoard'
import OuterScreen from './outerScreen'


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
                <div className='text-center relative w-[90%] md:w-[60%] mx-auto p-4 rounded-xl shadow-xl
                flex flex-col gap-2'>
                    <h1>Welcome to the Memory Game!</h1>
                    <label htmlFor='pairs' className='pt-8'>How many pairs of cards would you like to memorize?<br/></label>
                    <div className='w-[240px] mx-auto border-gray-200 border-2 px-3 py-2 m-3 rounded-lg drop'>
                        <div className='flex items-center justify-between'>
                            <input
                                name='pairs'
                                type='range'
                                min='2'
                                max='20'
                                value={numberOfPairs}
                                onChange={e => setNumberOfPairs(e.target.value)}
                                disabled={isActiveGame}
                            />
                            <span> {numberOfPairs}</span>
                        </div>
                    </div>
                    <OuterScreen startGame={startGame} />
                </div>
            }
        </div>
    );
}
 
export default Game;