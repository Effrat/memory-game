const OuterScreen = ({ startGame }) => {
    return ( 
        <div>
            <div className="outer-screen">Outer Screen</div>
            <button onClick={startGame}>Start Game</button>
        </div>
     );
}
 
export default OuterScreen;