import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BalanceContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 2px solid ${props => props.theme.colors.accent};

  @media (orientation: landscape) and (max-height: 600px) {
    left: 60px;
    top: 0;
    right: 0;
    height: 45px;
    padding: 0.25rem;
    justify-content: flex-end;
    gap: 0.5rem;
    padding-right: 1rem;
    background: rgba(0, 0, 0, 0.9);
  }
`;

const BalanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(139, 69, 19, 0.8);
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.accent};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 183, 0, 0.3);
  }

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.25rem 0.5rem;
    min-width: 80px;
    justify-content: center;
    background: rgba(139, 69, 19, 0.4);

    &:hover {
      background: rgba(139, 69, 19, 0.8);
    }
  }
`;

const BalanceIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 3px rgba(255, 183, 0, 0.5));

  @media (orientation: landscape) and (max-height: 600px) {
    width: 18px;
    height: 18px;
  }
`;

const BalanceAmount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  text-shadow: 0 0 5px rgba(255, 183, 0, 0.5);

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 0.9rem;
  }
`;

const CoinsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CoinIcon = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
  color: ${props => props.theme.colors.black};
  border: 2px solid ${props => props.theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  color: ${props => props.theme.colors.accent};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const TopUpButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
  border: 2px solid ${props => props.theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &:active {
    transform: scale(0.95);
  }
`;

const Balance = () => {
  const handleTopUp = () => {
    // Здесь будет логика пополнения баланса
    console.log('Top up clicked');
  };

  return (
    <BalanceContainer>
      <CoinsWrapper>
        <CoinIcon>$</CoinIcon>
        <CoinsAmount>1000</CoinsAmount>
      </CoinsWrapper>
      <TopUpButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTopUp}
      >
        Пополнить
      </TopUpButton>
    </BalanceContainer>
  );
};

export default Balance; 