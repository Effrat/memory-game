import Image from 'next/image'

const Card = ({ cardId, url, isFlipped, selectCard, isMatched }) => {
    return (
    <div className='container w-[106px] h-[106px]'>
        <div
            className='outer w-[106px] h-[106px] rounded-lg ease-in-out duration-150'
            onClick={() => !isFlipped ?  selectCard(cardId) : null}
        >
            <div className={`neon w-[106px] h-[106px] bg-gradient-to-tr from-teal-500 to-fuchsia-500 blur
                absolute rounded-full transition-all duration-500 ease-in-out ${isMatched ? 'opacity-20' : ''}`}></div>
            <div
                className={`inner w-[106px] h-[106px] bg-white shadow-inner 
                ${isFlipped ? ''
                : 'cursor-pointer relative drop-shadow rounded-lg hover:scale-105 active:scale-95 hover:bottom-[1px] hover:left-[1px] hover:drop-shadow-lg  transition-all duration-500 ease-in-out'} 
                ${isMatched ? 'opacity-20' : 'opacity-90'}`}>
                <div className='content h-full w-full flex justify-center items-center'>
                    <div className={`image-container w-[100px] h-[100px] rounded-md flex justify-center items-center`}>
                        <Image
                            className={`rounded-md transition-all duration-500 ease-in-out ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
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