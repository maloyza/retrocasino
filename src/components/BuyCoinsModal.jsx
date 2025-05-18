import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentService } from '../services/payment';
import { packages } from '../config/coinPackages';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 16px;
  padding: 32px 20px 24px 20px;
  width: 95vw;
  max-width: 400px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 16px 6px 12px 6px;
    border-radius: 10px;
    max-width: 98vw;
    min-width: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 18px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  @media (max-width: 600px) {
    top: 8px;
    right: 10px;
    font-size: 24px;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  font-family: 'Press Start 2P', cursive;
  font-size: 22px;
  margin-bottom: 18px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const CoinsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  width: 100%;
  margin-top: 10px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const CoinPackage = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 10px;
  padding: 18px 10px 14px 10px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    border-color: ${({ theme }) => theme.colors.text};
  }
  @media (max-width: 600px) {
    padding: 10px 4px 8px 4px;
    border-radius: 7px;
  }
`;

const CoinAmount = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  margin-bottom: 4px;
  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 2px;
  }
`;

const BonusAmount = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Press Start 2P', cursive;
  font-size: 13px;
  margin-bottom: 8px;
  @media (max-width: 600px) {
    font-size: 10px;
    margin-bottom: 4px;
  }
`;

const Price = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-family: 'Press Start 2P', cursive;
  font-size: 15px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: 11px;
    margin-bottom: 6px;
  }
`;

const BuyButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 6px;
  padding: 9px 0;
  font-family: 'Press Start 2P', cursive;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s, color 0.2s, transform 0.15s;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.04);
  }
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 6px 0;
    border-radius: 4px;
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
        // TODO: обработка успешного платежа
        console.log('Платеж успешно инициализирован');
      }
    } catch (error) {
      console.error('Ошибка при покупке:', error);
      alert('Произошла ошибка при обработке платежа. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>Покупка золотых монет</Title>
            <CoinsGrid>
              {packages.map((pkg, index) => (
                <CoinPackage 
                  key={index} 
                  whileTap={{ scale: 0.97 }}
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
    </AnimatePresence>,
    document.body
  );
};

export default BuyCoinsModal; 