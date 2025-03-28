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
`;

const BalanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(139, 69, 19, 0.8);
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.accent};
`;

const BalanceIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const BalanceAmount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
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