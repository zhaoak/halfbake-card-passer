import './App.css';
import initialCards from './cards-data';
import Player from './components/Player';
import CardList from './components/CardList';
import { useState, useContext } from 'react';
import ExecutePassButton from './components/ExecutePassButton';
import { useGameContext } from './context/GameContext.js';

function App() {
  const {
    deck,
    setDeck,
    playerOneHand,
    setPlayerOneHand,
    selectedCard,
    setSelectedCard,
    playerTwoHand,
    setPlayerTwoHand,
    playerThreeHand,
    setPlayerThreeHand,
    from,
    setFrom,
    to,
    setTo,
  } = useGameContext();

  // old state declarations
  // const [deck, setDeck] = useState(initialCards);
  // const [playerOneHand, setPlayerOneHand] = useState([]);
  // const [selectedCard, setSelectedCard] = useState();
  // const [playerTwoHand, setPlayerTwoHand] = useState([]);
  // const [playerThreeHand, setPlayerThreeHand] = useState([]);
  // const [from, setFrom] = useState('deck');
  // const [to, setTo] = useState(1);

  function findCardIndex(value, suit, cards) {
    return cards.findIndex((card) => card.value === value && card.suit === suit);
  }

  function passCard(card) {
    const playerHands = [playerOneHand, playerTwoHand, playerThreeHand];
    const playerHandSetFunctions = [setPlayerOneHand, setPlayerTwoHand, setPlayerThreeHand];

    // arrays start at zero, but our players start at 1 :shrug:
    const toHand = playerHands[to - 1] || deck;
    const fromHand = playerHands[from - 1] || deck;

    const toSetFunction = playerHandSetFunctions[to - 1] || setDeck;
    const fromSetFunction = playerHandSetFunctions[from - 1] || setDeck;

    const cardToMoveIndex = findCardIndex(card.value, card.suit, fromHand);
    const [cardToMove] = fromHand.splice(cardToMoveIndex, 1);

    toHand.push(cardToMove);

    toSetFunction([...toHand]);
    fromSetFunction([...fromHand]);

    setSelectedCard(null);
  }

  return (
    <div className="App">
      <section>
        {/* if the player names are numbers, that will make our life easier later because we can reuse numbers as arrays. Note that this will make our app brittle! */}
        <Player
          player={1}
          hand={playerOneHand}
          setFrom={setFrom}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <Player
          player={2}
          hand={playerTwoHand}
          setFrom={setFrom}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <Player
          player={3}
          hand={playerThreeHand}
          setFrom={setFrom}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <CardList
          cards={deck}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          setFrom={setFrom}
          player={'deck'}
        />
      </section>
      <section>
        {selectedCard && (
          <ExecutePassButton
            passCard={passCard}
            setFrom={setFrom}
            from={from}
            to={to}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      </section>
    </div>
  );
}

export default App;
