import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GameCard from '../components/GameCard';

const GamesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const GamesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 5px;
  }
`;

const games = [
  {
    id: 'blackjack',
    title: 'Блэкджек',
    description: 'Классическая карточная игра. Набери 21 очко и обыграй дилера!',
    image: '/assets/games/blackjack.jpg',
    coins: 500
  },
  {
    id: 'video-poker',
    title: 'Видео Покер',
    description: 'Собирай комбинации и выигрывай крупные призы!',
    image: '/assets/games/poker.jpg',
    coins: 300
  },
  {
    id: 'roulette',
    title: 'Рулетка',
    description: 'Испытай удачу в классической игре казино!',
    image: '/assets/games/roulette.jpg',
    coins: 1000
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const Games = () => {
  return (
    <GamesContainer>
      <GamesGrid
        variants={container}
        initial="hidden"
        animate="show"
      >
        {games.map(game => (
          <motion.div key={game.id} variants={item}>
            <GameCard game={game} />
          </motion.div>
        ))}
      </GamesGrid>
    </GamesContainer>
  );
};

export default Games; 