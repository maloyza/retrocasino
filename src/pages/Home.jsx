import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  padding: 20px 10px 140px 10px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', cursive;
  font-size: 1.8rem;
  margin-top: 20px;
`;

const DailyBonus = styled.button`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:active {
    transform: scale(0.98);
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 1200px;
`;

const GameCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  position: relative;
  border: 2px solid ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 175px;

  &:active {
    transform: scale(0.98);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`;

const GameTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 0.8rem;
  font-family: 'Press Start 2P', cursive;
  margin: 0;
  padding: 0;
`;

const GameBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 8px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  margin-top: auto;
`;

const CoinIcon = styled.div`
  width: 14px;
  height: 14px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-family: 'Press Start 2P', cursive;
  color: ${props => props.theme.colors.black};
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: ${props => props.theme.colors.accent};
`;

const Home = () => {
  const games = [
    {
      id: 'blackjack',
      title: 'Блэкджек',
      image: '/games/blackjack.jpg',
      coins: 2000
    },
    {
      id: 'video-poker',
      title: 'Видеопокер',
      image: '/games/poker.jpg',
      coins: 3000
    },
    {
      id: 'roulette',
      title: 'Рулетка',
      image: '/games/roulette.jpg',
      coins: 5000
    }
  ];

  return (
    <HomeContainer>
      <Title>Retro Casino</Title>
      <DailyBonus>Получить ежедневный бонус</DailyBonus>
      <GamesGrid>
        {games.map(game => (
          <Link to={`/${game.id}`} key={game.id} style={{ textDecoration: 'none' }}>
            <GameCard>
              <GameImage src={game.image} alt={game.title} />
              <GameTitle>{game.title}</GameTitle>
              <GameBalance>
                <CoinIcon>$</CoinIcon>
                <CoinsAmount>{game.coins}</CoinsAmount>
              </GameBalance>
            </GameCard>
          </Link>
        ))}
      </GamesGrid>
    </HomeContainer>
  );
};

export default Home; 