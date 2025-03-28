import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BalanceContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
`;

const CoinContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${props => props.theme.colors.secondary};
  padding: 8px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const CoinIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.color};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: ${props => props.theme.colors.accent};
    border-radius: 50%;
  }
`;

const Amount = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 14px;
`;

const Balance = ({ blueCoins, greenCoins, redCoins, goldCoins }) => {
  return (
    <BalanceContainer>
      <CoinContainer
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CoinIcon color="#0000FF" />
        <Amount>{blueCoins}</Amount>
      </CoinContainer>
      <CoinContainer
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CoinIcon color="#00FF00" />
        <Amount>{greenCoins}</Amount>
      </CoinContainer>
      <CoinContainer
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CoinIcon color="#FF0000" />
        <Amount>{redCoins}</Amount>
      </CoinContainer>
      <CoinContainer
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CoinIcon color="#FFD700" />
        <Amount>{goldCoins}</Amount>
      </CoinContainer>
    </BalanceContainer>
  );
};

export default Balance; 