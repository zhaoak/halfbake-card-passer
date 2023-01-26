import React from 'react';
import CardList from './CardList';
import { useContext } from 'react';
import { useGameContext } from '../context/GameContext.js';

export default function Player({ player, hand, setFrom, setSelectedCard, selectedCard }) {
  // only taking these two from context because other state vars need to be per player (and thus passed thru props), not shared among all player components
  const { to, setTo } = useGameContext();
  return (
    <div
      className={`player ${to === player ? 'selected-player' : ''}`}
      onClick={() => setTo(player)}
    >
      <p>Player {player}</p>
      <CardList
        player={player}
        cards={hand}
        setFrom={setFrom}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </div>
  );
}
