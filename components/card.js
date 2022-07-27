import Image from 'next/image'

const Card = ({ cardId, pairId, url, isFlipped, selectCard, isMatched }) => {
    return (
    <div className='game-board'>
        <div
            className={`
                card back outer container
                
                
            `}
            onClick={() => !isFlipped ?  selectCard(cardId) : null}
        >
            <div className='neon w-full h-full'></div>
            <div className={`card inner container ${isFlipped ? '' : 'cursor-pointer relative hover:bottom-[1px] hover:left-[1px]'}`}>
                <div className='card-content h-full w-full flex justify-center items-center'>
                    <div className={`image-container w-full h-full rounded-md flex justify-center items-center`}>
                        <Image
                            className={`rounded-md ${isFlipped ? '' : 'opacity-0'}`}
                            src={url}
                            alt='/'
                            height='100'
                            width='100'
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
 
export default Card;