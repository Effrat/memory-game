
export const getCardsDataFromAPI = async numberOfPairs => {
    const res = await fetch(`https://api.thedogapi.com/v1/images/search?limit=${numberOfPairs}`)
    const json = await res.json()
    let cardsData = []
    json.forEach((pair, pairId) => {
        cardsData.push({
            pairId: pair.id,
            cardId: pairId,
            url: pair.url,
            isFlipped: false,
            isMatched: false
        })
        cardsData.push({
            pairId: pair.id,
            cardId: pairId + json.length,
            url: pair.url,
            isFlipped: false,
            isMatched: false
        })    
    })
    return cardsData
}