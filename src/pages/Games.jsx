import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GameCard from '../components/GameCard';

const GamesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-top: 60px;

  @media (orientation: landscape) {
    padding: 5px;
    padding-top: 50px;
  }
`;

const GamesGrid = styled(motion.div)`
  display: grid;
  width: 100%;
  height: calc(100% - 60px);
  max-width: 1200px;
  gap: 15px;
  padding: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;

  @media (orientation: landscape) {
    gap: 10px;
    padding: 5px;
    height: calc(100% - 50px);
  }

  &::-webkit-scrollbar {
    display: none;
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