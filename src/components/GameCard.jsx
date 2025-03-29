import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: calc(100% - 40px); // Оставляем место для баланса
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (orientation: landscape) {
    padding: 8px;
    gap: 8px;
    height: calc(100% - 35px);
  }
`;

const GameImageWrapper = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  min-height: 60px;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const GameContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
`;

const GameTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (orientation: landscape) {
    font-size: 10px;
    margin-bottom: 2px;
  }
`;

const GameDescription = styled.p`
  font-size: 10px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (orientation: landscape) {
    font-size: 8px;
    margin-bottom: 2px;
    -webkit-line-clamp: 1;
  }
`;

const GameBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  height: 32px;

  @media (orientation: landscape) {
    height: 27px;
    padding: 4px 8px;
  }
`;

const CoinIcon = styled.div`
  width: 18px;
  height: 18px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
  color: ${props => props.theme.colors.black};
  border: 2px solid ${props => props.theme.colors.text};

  @media (orientation: landscape) {
    width: 15px;
    height: 15px;
    font-size: 8px;
  }
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: ${props => props.theme.colors.accent};

  @media (orientation: landscape) {
    font-size: 10px;
  }
`;

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const { id, title, description, image, coins } = game;

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <CardWrapper>
      <Card
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        layout
      >
        <GameImageWrapper>
          <GameImage src={image} alt={title} />
        </GameImageWrapper>
        <GameContent>
          <GameTitle>{title}</GameTitle>
          <GameDescription>{description}</GameDescription>
        </GameContent>
      </Card>
      <GameBalance>
        <CoinIcon>$</CoinIcon>
        <CoinsAmount>{coins}</CoinsAmount>
      </GameBalance>
    </CardWrapper>
  );
};

export default GameCard; 