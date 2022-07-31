const EndGameScreen = ({ handleNewGame }) => {
    return (
        <div className='end-game-screen flex flex-col gap-4 justify-center'>
            <h1>Congratulations!</h1>
            <div>
                <button onClick={handleNewGame}>Play Again</button>
            </div>
        </div>
    );
}

export default EndGameScreen