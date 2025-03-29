import React from 'react';
import styled from 'styled-components';

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

const Balance = () => {
  // Демо-данные
  const balance = {
    gold: 1000,
    blue: 500,
    green: 300,
    red: 200
  };

  return (
    <BalanceContainer>
      <BalanceItem>
        <BalanceIcon src="/assets/icons/gold-coin.png" alt="Gold" />
        <BalanceAmount>{balance.gold}</BalanceAmount>
      </BalanceItem>
      <BalanceItem>
        <BalanceIcon src="/assets/icons/blue-coin.png" alt="Blue" />
        <BalanceAmount>{balance.blue}</BalanceAmount>
      </BalanceItem>
      <BalanceItem>
        <BalanceIcon src="/assets/icons/green-coin.png" alt="Green" />
        <BalanceAmount>{balance.green}</BalanceAmount>
      </BalanceItem>
      <BalanceItem>
        <BalanceIcon src="/assets/icons/red-coin.png" alt="Red" />
        <BalanceAmount>{balance.red}</BalanceAmount>
      </BalanceItem>
    </BalanceContainer>
  );
};

export default Balance; 