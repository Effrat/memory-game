import { useState, useEffect } from "react"
import Image from "next/image"
import { getCardsDataFromAPI } from "../utils/getCards"

const GameBoard = ({ endGame, numberOfPairs }) => {
    
    const [cards, setCards] = useState([])

    const getCardsData = async () => {
        // const cardsData = await getCardsDataFromAPI(numberOfPairs)
        const cardsData = await getServerSideProps(numberOfPairs)
        setCards(cardsData)
    }

    useEffect(() => {
        getCardsData()
    }, [numberOfPairs])

    useEffect(() => {
        console.log("cards: ", cards)
    }, [cards])

    return (
        <div>
            <div>Game Board: {numberOfPairs}</div>
            <button onClick={endGame}>End Game</button>
            <div>
                {cards.map(card => (
                    <div key={card}>
                    {/* {
                        cards !== []
                        ? <Image src={card} layout='fill' alt='/' />
                        : <div>Loading...</div>
                    } */}
                    <Image src={card} alt='/' height='50' width='50' />
                    {/* <img src={card} alt='/' height={100} /> */}
                    {/* <p>{card}</p> */}
                    </div>
                ))}
            </div>
            {/* {cards.map(card => <Card key={card.id} card={card} />)} */}
        </div>
    );
}
 
export default GameBoard;

export async function getServerSideProps(numberOfPairs)  {
    const cardsData = await getCardsDataFromAPI(numberOfPairs)
    return cardsData
}