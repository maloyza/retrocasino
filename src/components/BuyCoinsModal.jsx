import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentService } from '../services/payment';
import { packages } from '../config/coinPackages';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.gradients.dark};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
`;

const Title = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
`;

const CoinsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const CoinPackage = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 183, 0, 0.3);
  }
`;

const CoinAmount = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 5px;
`;

const BonusAmount = styled.div`
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  color: #4CAF50;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const BuyButton = styled.button`
  background: ${({ theme }) => theme.gradients.accent};
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 183, 0, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const BuyCoinsModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async (pkg) => {
    try {
      setIsLoading(true);
      const description = `Покупка ${pkg.coins} монет + ${pkg.bonus} бонусных`;
      const success = await paymentService.initiatePayment(pkg.price, description);
      
      if (success) {
        // В реальном приложении здесь будет обработка успешного платежа
        console.log('Платеж успешно инициализирован');
      }
    } catch (error) {
      console.error('Ошибка при покупке:', error);
      alert('Произошла ошибка при обработке платежа. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>Покупка золотых монет</Title>
            <CoinsGrid>
              {packages.map((pkg, index) => (
                <CoinPackage 
                  key={index} 
                  onClick={() => !isLoading && handleBuy(pkg)}
                  style={{ opacity: isLoading ? 0.7 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                >
                  <CoinAmount>{pkg.coins.toLocaleString()} монет</CoinAmount>
                  <BonusAmount>+{pkg.bonus.toLocaleString()} бонусных</BonusAmount>
                  <Price>{pkg.price} старс</Price>
                  <BuyButton disabled={isLoading}>
                    {isLoading ? 'Загрузка...' : 'Купить'}
                  </BuyButton>
                </CoinPackage>
              ))}
            </CoinsGrid>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default BuyCoinsModal; 