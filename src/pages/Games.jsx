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
      id: 'blackjack',
      title: 'Блэкджек',
      description: 'Классическая карточная игра против дилера',
      image: 'prev_blackjack.png',
      coins: 2000
    },
    {
      id: 'video-poker',
      title: 'Видеопокер',
      description: 'Draw poker с классическими правилами',
      image: 'prev_video-poker.png',
      coins: 3000
    },
    {
      id: 'roulette',
      title: 'Рулетка',
      description: 'Европейская рулетка с классическими ставками',
      image: 'prev_roulette.png',
      coins: 5000
    }
  ];

  const getImagePath = (filename) => `${import.meta.env.BASE_URL}images/games/${filename}`;

  return (
    <GamesContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GamesGrid>
        {games.map(game => (
          <GameCard key={game.id} game={{ ...game, image: getImagePath(game.image) }} />
        ))}
      </GamesGrid>
    </GamesContainer>
  );
};

export default Games; 