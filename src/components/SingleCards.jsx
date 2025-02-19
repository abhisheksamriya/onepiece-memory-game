import "./SingleCards.css"

const SingleCards = ({card,handleChoice,flipped,disabled}) => {

    const handleClick=()=>{
        if(!disabled)
        {
          handleChoice(card);
        }
    }

  return (
    <div className='card' >
            <div className={flipped ? "flipped":""}>
              <img className='front' src={card.src} />
              <img className='back' onClick={handleClick} src="/img/cover.jpg" />
            </div>
          </div>
  )
}

export default SingleCards