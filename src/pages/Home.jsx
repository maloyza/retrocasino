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
  padding-top: max(20px, env(safe-area-inset-top));
  padding-bottom: max(20px, env(safe-area-inset-bottom));
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  background: ${props => props.theme.colors.background};

  @media (orientation: landscape) {
    padding: 15px;
    padding-top: max(15px, env(safe-area-inset-top));
    padding-bottom: max(15px, env(safe-area-inset-bottom));
    gap: 15px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  padding-bottom: 70px;

  @media (orientation: landscape) {
    gap: 15px;
    padding-bottom: 60px;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', cursive;
  font-size: 1.8rem;

  @media (orientation: landscape) {
    font-size: 1.5rem;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 0 5px;

  @media (orientation: landscape) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

const GameCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 200px;
  
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

  @media (orientation: landscape) {
    padding: 10px;
    height: 180px;
    gap: 6px;
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 5px;

  @media (orientation: landscape) {
    height: 120px;
  }
`;

const GameTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  margin: 0;
  padding: 0;

  @media (orientation: landscape) {
    font-size: 0.9rem;
  }
`;

const DailyBonus = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  &:active {
    transform: scale(0.95);
  }

  @media (orientation: landscape) {
    padding: 10px 20px;
    margin-bottom: 10px;
    font-size: 0.8rem;
  }
`;

const GameBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  margin-top: auto;
`;

const CoinIcon = styled.div`
  width: 16px;
  height: 16px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
  color: ${props => props.theme.colors.black};
  border: 1px solid ${props => props.theme.colors.text};
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
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
      <ContentWrapper>
        <Title>Retro Casino</Title>
        <DailyBonus
          as={motion.button}
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
                <GameBalance>
                  <CoinIcon>$</CoinIcon>
                  <CoinsAmount>{game.coins}</CoinsAmount>
                </GameBalance>
              </GameCard>
            </Link>
          ))}
        </GamesGrid>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home; 