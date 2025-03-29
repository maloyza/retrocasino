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
  scroll-behavior: smooth;
`;

const WelcomeSection = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    border: 2px solid ${props => props.theme.colors.accent};
    border-radius: 50%;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-20px) translateX(-50%);
    }
    60% {
      transform: translateY(-10px) translateX(-50%);
    }
  }
`;

const Title = styled(motion.h1)`
  color: ${props => props.theme.colors.accent};
  text-align: center;
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Press Start 2P', cursive;
  font-size: 2.5rem;
`;

const DailyBonus = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const GamesSection = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-margin-top: 20px;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin-top: 20px;
`;

const GameCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  border: 2px solid ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 280px;
  transform-origin: center;
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const GameTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  font-family: 'Press Start 2P', cursive;
  margin: 0;
  padding: 0;
`;

const GameBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
  margin-top: auto;
`;

const CoinIcon = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'Press Start 2P', cursive;
  color: ${props => props.theme.colors.black};
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
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