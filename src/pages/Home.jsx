import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  margin-top: 60px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', cursive;
  font-size: 1.8rem;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0 5px;
  margin-top: 20px;
`;

const GameCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 180px;
`;

const GameImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
`;

const GameTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-family: 'Press Start 2P', cursive;
  margin: 0;
  padding: 0;
`;

const DailyBonus = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const GameBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 4px 8px;
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