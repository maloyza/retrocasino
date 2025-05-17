import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 130px);
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const DailyBonusButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.background};
  padding: 15px 30px;
  border-radius: 8px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  margin-bottom: 30px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const GameCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  aspect-ratio: 1;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 80%;
    height: auto;
    margin-bottom: 15px;
    object-fit: contain;
  }

  h3 {
    font-family: 'Press Start 2P', cursive;
    font-size: 1rem;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.text};
  }

  .price {
    color: ${props => props.theme.colors.accent};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const games = [
  { id: 'blackjack', name: 'Блэкджек', price: 2000, image: '/images/games/blackjack.png', path: '/blackjack' },
  { id: 'video-poker', name: 'Видеопокер', price: 3000, image: '/images/games/video-poker.png', path: '/video-poker' },
  { id: 'roulette', name: 'Рулетка', price: 5000, image: '/images/games/roulette.png', path: '/roulette' }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Title>Retro Casino</Title>
      <DailyBonusButton>Получить ежедневный бонус</DailyBonusButton>
      <GamesGrid>
        {games.map(game => (
          <GameCard
            key={game.id}
            onClick={() => navigate(game.path)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={game.image} alt={game.name} />
            <h3>{game.name}</h3>
            <div className="price">
              <span>🪙</span>
              {game.price}
            </div>
          </GameCard>
        ))}
      </GamesGrid>
    </Container>
  );
};

export default Home; 