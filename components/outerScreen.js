const OuterScreen = ({ startGame }) => {
    return ( 
        <div>
            <div className="outer-screen">Memory Game</div>
            <button onClick={startGame}>Start</button>
        </div>
     );
}
 
export default OuterScreen;