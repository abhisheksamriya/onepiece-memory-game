import { useEffect, useState } from 'react'
import './App.css'
import SingleCards from './components/SingleCards';

const cardImages = [
  { src: "/img/luffy.jpg", matched: false },
  { src: "/img/zoro.jpg", matched: false },
  { src: "/img/nami.jpg", matched: false },
  { src: "/img/sanji.jpg", matched: false },
  { src: "/img/chopper.jpg", matched: false },
  { src: "/img/usopp.jpg", matched: false },
  { src: "/img/robin.jpg", matched: false },
  { src: "/img/ace.jpg", matched: false },

];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  // Shuffle array function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Duplicate and shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .map((card) => ({ ...card, id: Math.random() }));
    
    shuffleArray(shuffledCards);

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setScore(score => score + 100);
        setCards(prevCards =>
          prevCards.map(card =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turn => turn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);


  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {

      const allMatched = cards.length > 0 && cards.every((card) => card.matched);

      if (allMatched) {
        setGameOver(true);
        return;
      }

      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  return (
    <div className="App">
      <h1>One Piece Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Score: {score} | Turns: {turns} | ⏳ Time Left: {timeLeft}s</p>

      {gameOver ? (
  <h2 className="game-over">
    {cards.every((card) => card.matched) ? "🎉 You Win!" : "⛔ Game Over! Time's Up!"}
  </h2>
) : (
  <div className="card-grid">
    {cards.map((card) => (
      <SingleCards
        key={card.id}
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
      />
    ))}
  </div>
)}

    </div>
  );
}

export default App;
