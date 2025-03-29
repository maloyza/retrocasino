import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  padding: 20px 10px;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Title = styled(motion.h1)`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', cursive;
  font-size: 1.8rem;
`;

const DailyBonus = styled(motion.button)`
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
`;

const GamesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 200px);
`;

const GameCard = styled(motion.div)`
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
  height: 160px;
  transform-origin: center;
`;

const GameImage = styled.img`
  width: 100%;
  height: 90px;
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
  const titleAnimation = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const bonusAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardAnimation = {
    initial: { y: 50, opacity: 0 },
    whileInView: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    viewport: { once: true }
  };

  const handleScrollToGames = () => {
    document.querySelector('#games-section').scrollIntoView({ behavior: 'smooth' });
  };

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
      <WelcomeSection>
        <Title
          variants={titleAnimation}
          initial="initial"
          animate="animate"
        >
          Retro Casino
        </Title>
        <DailyBonus
          as={motion.button}
          variants={bonusAnimation}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Получить ежедневный бонус
        </DailyBonus>
      </WelcomeSection>

      <GamesSection id="games-section">
        <GamesGrid>
          {games.map((game, index) => (
            <Link to={`/${game.id}`} key={game.id} style={{ textDecoration: 'none' }}>
              <GameCard
                variants={cardAnimation}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: index * 0.1 }}
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
      </GamesSection>
    </HomeContainer>
  );
};

export default Home; 