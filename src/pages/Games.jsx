import React from 'react';
import styled from 'styled-components';
import GameCard from '../components/GameCard';
import { motion } from 'framer-motion';

const GamesContainer = styled(motion.div)`
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 60px);
  width: 100%;
  padding: 10px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (orientation: landscape) {
    padding: 8px;
    height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 50px);
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: 200px;
  width: 100%;
  
  @media (orientation: landscape) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 180px;
    gap: 8px;
  }
`;

const Games = () => {
  const games = [
    {
      id: 'slots',
      title: 'Retro Slots',
      description: 'Classic slot machine with retro symbols',
      image: '/games/slots.jpg',
      coins: 1000
    },
    {
      id: 'blackjack',
      title: 'Blackjack',
      description: 'Classic card game against the dealer',
      image: '/games/blackjack.jpg',
      coins: 2000
    },
    {
      id: 'poker',
      title: 'Video Poker',
      description: 'Draw poker with classic rules',
      image: '/games/poker.jpg',
      coins: 3000
    },
    {
      id: 'roulette',
      title: 'Roulette',
      description: 'European roulette with classic bets',
      image: '/games/roulette.jpg',
      coins: 5000
    }
  ];

  return (
    <GamesContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GamesGrid>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </GamesGrid>
    </GamesContainer>
  );
};

export default Games; 