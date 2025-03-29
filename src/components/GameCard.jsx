import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  aspect-ratio: 1.2;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const GameImage = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const GameTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const GameDescription = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.text};
  margin-bottom: auto;
  flex: 1;
`;

const CoinsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
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
  border: 2px solid ${props => props.theme.colors.text};
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: ${props => props.theme.colors.accent};
`;

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const { id, title, description, image, coins } = game;

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      layout
    >
      <GameImage src={image} alt={title} />
      <GameTitle>{title}</GameTitle>
      <GameDescription>{description}</GameDescription>
      <CoinsInfo>
        <CoinIcon>$</CoinIcon>
        <CoinsAmount>{coins}</CoinsAmount>
      </CoinsInfo>
    </Card>
  );
};

export default GameCard; 