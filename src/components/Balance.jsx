import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BalanceContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 15px;

  @media (orientation: landscape) {
    padding: 0 10px;
  }
`;

const CoinsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CoinIcon = styled.div`
  width: 24px;
  height: 24px;
  background: var(--tg-theme-button-color, ${props => props.theme.colors.accent});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
  color: var(--tg-theme-button-text-color, ${props => props.theme.colors.black});
  border: 2px solid var(--tg-theme-text-color, ${props => props.theme.colors.text});
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (orientation: landscape) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  color: var(--tg-theme-button-color, ${props => props.theme.colors.accent});
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-right: 10px;

  @media (orientation: landscape) {
    font-size: 14px;
  }
`;

const TopUpButton = styled(motion.button)`
  background: var(--tg-theme-button-color, ${props => props.theme.colors.accent});
  color: var(--tg-theme-button-text-color, ${props => props.theme.colors.black});
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
  border: 2px solid var(--tg-theme-text-color, ${props => props.theme.colors.text});
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (orientation: landscape) {
    font-size: 12px;
    padding: 4px 10px;
  }

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
    <BalanceContent>
      <CoinsWrapper>
        <CoinIcon>$</CoinIcon>
        <CoinsAmount>1000</CoinsAmount>
        <TopUpButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTopUp}
        >
          Пополнить
        </TopUpButton>
      </CoinsWrapper>
    </BalanceContent>
  );
};

export default Balance; 