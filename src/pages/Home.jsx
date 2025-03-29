import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height: 100%;

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 10px;
    gap: 10px;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', cursive;
  font-size: 2rem;

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (orientation: landscape) and (max-height: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 0 10px;
  }
`;

const GameCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;

  @media (orientation: landscape) and (max-height: 600px) {
    height: 100px;
    margin-bottom: 5px;
  }
`;

const GameTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
  font-size: 1.2rem;

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 1rem;
    margin-bottom: 5px;
  }
`;

const DailyBonus = styled(motion.div)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 15px 30px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 183, 0, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 183, 0, 0.5);
  }

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 8px 20px;
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
`;

const Home = () => {
  const games = [
    {
      id: 'blackjack',
      title: 'Блэкджек',
      image: '/assets/blackjack.jpg',
      color: '#0000FF'
    },
    {
      id: 'video-poker',
      title: 'Видеопокер',
      image: '/assets/video-poker.jpg',
      color: '#00FF00'
    },
    {
      id: 'roulette',
      title: 'Рулетка',
      image: '/assets/roulette.jpg',
      color: '#FF0000'
    }
  ];

  return (
    <HomeContainer>
      <Title>Retro Casino</Title>
      <DailyBonus
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Получить ежедневный бонус
      </DailyBonus>
      <GamesGrid>
        {games.map(game => (
          <Link to={`/${game.id}`} key={game.id} style={{ textDecoration: 'none' }}>
            <GameCard
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GameImage src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
            </GameCard>
          </Link>
        ))}
      </GamesGrid>
    </HomeContainer>
  );
};

export default Home; 