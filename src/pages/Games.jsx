import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GamesContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: url('/assets/backgrounds/games-bg.png') center/cover no-repeat;
  padding: 1rem;
  padding-top: calc(1rem + 60px);

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.5rem;
    padding-top: calc(0.5rem + 40px);
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (orientation: landscape) and (max-height: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const GameCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.accent};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;

  @media (orientation: landscape) and (max-height: 600px) {
    height: 100px;
  }
`;

const GameInfo = styled.div`
  padding: 0.8rem;

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.5rem;
  }
`;

const GameTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.primary};

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 0.8rem;
  }
`;

const GameDescription = styled.p`
  margin: 0.5rem 0 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 0.7rem;
    margin-top: 0.3rem;
  }
`;

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'Покер',
      description: 'Классический Техасский Холдем',
      image: '/assets/games/poker.jpg'
    },
    {
      id: 2,
      title: 'Блэкджек',
      description: '21 очко для профессионалов',
      image: '/assets/games/blackjack.jpg'
    },
    {
      id: 3,
      title: 'Рулетка',
      description: 'Европейская рулетка',
      image: '/assets/games/roulette.jpg'
    },
    {
      id: 4,
      title: 'Слоты',
      description: 'Разнообразные слот-машины',
      image: '/assets/games/slots.jpg'
    },
    {
      id: 5,
      title: 'Баккара',
      description: 'Элегантная карточная игра',
      image: '/assets/games/baccarat.jpg'
    },
    {
      id: 6,
      title: 'Кости',
      description: 'Классические кости',
      image: '/assets/games/dice.jpg'
    }
  ];

  const handleGameClick = (gameId) => {
    // Здесь будет логика запуска игры
    console.log(`Launching game ${gameId}`);
  };

  return (
    <GamesContainer>
      <GamesGrid>
        {games.map((game) => (
          <GameCard
            key={game.id}
            onClick={() => handleGameClick(game.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GameImage src={game.image} alt={game.title} />
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
            </GameInfo>
          </GameCard>
        ))}
      </GamesGrid>
    </GamesContainer>
  );
};

export default Games; 