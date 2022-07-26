import { useState, useEffect } from "react"
import { getCardsDataFromAPI } from "../utils/getCards"
import Card from "../components/card.js"

const GameBoard = ({ endGame, numberOfPairs }) => {
    
    const [cards, setCards] = useState(null)
    const [flippedCount, setFlippedCount] = useState(0)
    const [attemptsCount, setAttemptsCount] = useState(0)
    const [matchedPairsCount, setMatchedPairsCount] = useState(0)


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
    
    const  selectCard = (cardId) => {
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

    useEffect(() => {

        const unflipCards = (prevCards) => {
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
        const getCardsData = async () => {
            console.log('getCardsData')
            const cardsData = await getServerSideProps(numberOfPairs)
            setCards(cardsData)
        }
        getCardsData()
    }, [numberOfPairs]) 


    return (
        <div className='flex flex-col items-center'>
            {cards 
                ? <div> 
                    <div>Pairs: {numberOfPairs}</div>
                    {<div>Flipped Cards: {flippedCount}</div>}
                    {<div>Attempts: {attemptsCount}</div>}
                    {<div>Matched pairs: {matchedPairsCount}</div>}
                    <button onClick={endGame}>End Game</button>
                    <div className='flex flex-wrap gap-3 p-4'>
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