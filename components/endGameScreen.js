const EndGameScreen = () => {
    const [isGameWon, setIsGameWon] = useState(true)

    return (
        <div className="endGameScreen">
            {isGameWon ? <h1>Congratulations, you won!</h1> : <h1>Game Ended by Player</h1>}
            <p>You scored:</p>
            <p>0</p>
            <button>Play Again</button>
        </div>
    );
}