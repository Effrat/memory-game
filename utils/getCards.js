export const getCardsDataFromAPI = async numberOfPairs => {
    const cardsData = await fetch(`https://api.thedogapi.com/v1/images/search?limit=${numberOfPairs}`)
    const cardsDataJson = await cardsData.json()
    return cardsDataJson.map(card => card.url)
}
// [...Array(Number(numberOfPairs)).fill(0).keys()]