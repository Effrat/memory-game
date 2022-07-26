import Image from "next/image"

const Card = ({ cardId, pairId, url, isFlipped, selectCard, isMatched }) => {


    if(isMatched) 
        return (
            <div className='card matched bg-green-200 shadow-lg opacity-20' >
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h3>{pairId}</h3>
                    <Image
                        className='rounded'
                        src={url}
                        alt='/'
                        height='70'
                        width='70'
                    />
                </div>
            </div>
        )
        else if(isFlipped)
            return (
                <div className='card front bg-green-200 w-[100px] h-[120px] rounded shadow-lg' >
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <h3>{pairId}</h3>
                        <Image
                            className='rounded'
                            src={url}
                            alt='/'
                            height='70'
                            width='70'
                        />
                    </div>
                </div>
            )
            else
                return (
                    <div
                        className='card back bg-red-200 w-[100px] h-[120px] cursor-pointer rounded shadow-lg'
                        onClick={() => selectCard(cardId)}
                    >
                        <div className='w-full h-full flex flex-col justify-center items-center'>
                            <p>{pairId}</p>
                            <Image
                                className='rounded opacity-20'
                                src={url}
                                alt='/'
                                height='70'
                                width='70'
                            />
                        </div>
                    </div>
                )
}
 
export default Card;