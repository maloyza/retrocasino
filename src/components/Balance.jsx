import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BuyCoinsModal from './BuyCoinsModal';

const BalanceContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 2px solid ${props => props.theme.colors.accent};
  padding: 5px 15px;
  height: 50px;

  @media (orientation: landscape) {
    padding: 5px 10px;
    height: 40px;
  }
`;

const CoinsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: none;
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

  @media (orientation: landscape) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

const CoinsAmount = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  color: ${props => props.theme.colors.accent};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-right: 10px;

  @media (orientation: landscape) {
    font-size: 14px;
  }
`;

const TopUpButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
  border: 2px solid ${props => props.theme.colors.text};
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTopUp = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <BalanceContainer>
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
      </BalanceContainer>

      <BuyCoinsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Balance; 