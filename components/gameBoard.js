import { useState, useEffect } from "react"
import { getCardsDataFromAPI } from "../utils/getCards"
import Card from "../components/card.js"

const GameBoard = ({ numberOfPairs, totalGameTime, setTotalSecondsActive, setIsActiveGame }) => {
    
    const [cards, setCards] = useState(null)
    const [flippedCount, setFlippedCount] = useState(0)
    const [flippingAllowed, setFlippingAllowed] = useState(true)
    const [attemptsCount, setAttemptsCount] = useState(0)
    const [matchedPairsCount, setMatchedPairsCount] = useState(0)

    const endGame = () => {
        setIsActiveGame(false)
    }

    const getCardsData = async () => {
        console.log('getCardsData')
        const cardsData = await getServerSideProps(numberOfPairs)
        setCards(cardsData)
    }

    const flipToFront = (cardId) => {
        console.log('flipToFront, cardId: ', cardId)
        setFlippedCount((prevFlippedCount) => prevFlippedCount + 1)
        setCards((preCards) => {
            const newCards = [...preCards]
            let card = newCards.find(card => card.cardId === cardId)
            card.isFlipped = true
            return newCards
        })
    }

    const handleResetGame = () => {
        setFlippedCount(0)
        setAttemptsCount(0)
        setMatchedPairsCount(0)
        setFlippingAllowed(true)
        setTotalSecondsActive(0)
        setCards(prevCards => {
            const newCards = [...prevCards]
            newCards.forEach(card => {
                card.isFlipped = false
                card.isMatched = false
                })
            return newCards
        })
    }
    
    const  selectCard = (cardId) => {
        if (flippingAllowed) {
            switch (flippedCount) {
                case 0:
                    flipToFront(cardId)
                    break
                case 1:
                    flipToFront(cardId)
                    break
                default:
                    break
            }
        }
    }

    useEffect(() => {

        const unflipCards = (prevCards) => {
            setFlippingAllowed(true)
            let newCards = []
            for (let i = 0; i < prevCards.length; i++) {
                let card = prevCards[i]
                if (card.isFlipped && !card.isMatched) {
                    card.isFlipped = false
                }
                newCards.push(card)
            }
            setCards(newCards)
        }

        const matchCards = (prevCards) => {
            setFlippingAllowed(true)
            let newCards = []
            for (let i = 0; i < prevCards.length; i++) {
                let card = prevCards[i]
                if (card.isFlipped && !card.isMatched) {
                    card.isMatched = true
                }
                newCards.push(card)
            }
            
            setCards(newCards)
        }

        const pairIsMatched = () => {
            console.log('pair is matched')
            // update matchedPairsCount
            setMatchedPairsCount((prevMatchedPairsCount) => prevMatchedPairsCount + 1)
            // set cards as matched after delay
            setFlippedCount(0, 
                setTimeout(() => {
                    console.log("matchCards timeout")
                    matchCards(cards)
                }, 2000)
            )
        }

        const pairIsNotMatched = async () => {
            console.log('pair is not matched')
            // unflip cards after delay
            setFlippedCount(0, 
                setTimeout(() => {
                    console.log("unmatchCards timeout")
                    unflipCards(cards)
                }, 2000)
            )
        }

        switch (flippedCount) {
            case 0:
                console.log('flippedCount == 0')
                break
            case 1:
                console.log('flippedCount == 1')
                break
            case 2:
                setFlippingAllowed(false)
                console.log('flippedCount == 2')
                setAttemptsCount((prevAttemptsCount) => prevAttemptsCount + 1)
                // filter cards with isFlipped: true && isMatched: false
                const flippedCards = [...cards].filter(card => (!card.isMatched && card.isFlipped))
                // determine if pair is matched
                if (flippedCards[0].pairId === flippedCards[1].pairId) {
                    pairIsMatched(flippedCards[0], flippedCards[1])
                } else {
                    pairIsNotMatched()
                }
                break

            default:
                break
        }
    }, [flippedCount])

    useEffect(() => {
        console.log('cards updated')
    }, [cards])


    useEffect(() => {
        if (matchedPairsCount === Number(numberOfPairs)) {
            // endGame()
            console.log('end game')
        }
    }, [matchedPairsCount, numberOfPairs])

    useEffect(() => {
        getCardsData()
    }, [numberOfPairs]) 


    return (
        <div className='items-center p-6'>
            {cards 
                ? <div className='flex flex-col items-center gap-4'> 
                    <div className='flex justify-between w-[90%] md:w-[60%] text-sm sm:text-base'>
                        <div>Time: {totalGameTime.hours}:{totalGameTime.minutes}:{totalGameTime.seconds}</div>
                        <div>Attempts: {attemptsCount}</div>
                        <div>Matched pairs: {matchedPairsCount}/{numberOfPairs}</div>
                    </div>
                    <div className='buttons flex gap-4 flex-wrap flex-col sm:flex-row'>
                        <button onClick={endGame}>End Game</button>
                        {/* <button onClick={handleResetGame}>Reset Game</button> */}
                        <button onClick={() => getCardsData(handleResetGame())}>New Game</button>
                    </div>
                    <div className='board relative w-[90%] md:w-[60%] mx-auto p-4 rounded-xl shadow-xl'>
                        <div className='relative flex flex-wrap justify-center gap-3 p-4'>
                            {cards.map(card => (
                                <Card
                                    key={card.cardId}
                                    pairId={card.pairId}
                                    cardId={card.cardId}
                                    url={card.url}
                                    isFlipped={card.isFlipped}
                                    selectCard={selectCard}
                                    isMatched={card.isMatched}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                : <div>Loading...</div>
            }
        </div>
    );
}
 
export default GameBoard;

export async function getServerSideProps(numberOfPairs)  {
    const cardsData = await getCardsDataFromAPI(numberOfPairs)
    return cardsData
}