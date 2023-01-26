import React from 'react';
import CardList from './CardList';
import { useContext } from 'react';
import { useGameContext } from '../context/GameContext.js';

export default function Player({ player, hand }) {
  // player and hand are per-player and thus must be passsed as props to individual Player components
  const { to, setTo, setSelectedCard, selectedCard, setFrom } = useGameContext();
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
