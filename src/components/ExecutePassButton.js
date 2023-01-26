import React from 'react';
import Card from './Card';
import { useGameContext } from '../context/GameContext.js';

export default function ExecutePassButton({ passCard }) {
  const { setFrom, from, to, selectedCard, setSelectedCard } = useGameContext();
  return (
    <div className="execute-button" onClick={() => passCard(selectedCard)}>
      Pass <Card card={selectedCard} setSelectedCard={setSelectedCard} setFrom={setFrom} /> from{' '}
      {from} to {to}
    </div>
  );
}
