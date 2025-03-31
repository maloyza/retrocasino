import React from 'react';
import styled from 'styled-components';

const BuyCoinsContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.gradients.dark};
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 20px rgba(255, 183, 0, 0.2);
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

const packages = [
  { coins: 600, bonus: 600, price: 99 },
  { coins: 3000, bonus: 300, price: 499 },
  { coins: 9800, bonus: 1100, price: 1499 },
  { coins: 19800, bonus: 2600, price: 2999 },
  { coins: 32800, bonus: 6000, price: 4999 },
  { coins: 64800, bonus: 16000, price: 9999 }
];

const BuyCoins = () => {
  const handleBuy = (pkg) => {
    // В демо версии просто показываем уведомление
    alert(`Демо версия: Покупка ${pkg.coins} монет + ${pkg.bonus} бонусных за ${pkg.price} старс`);
  };

  return (
    <BuyCoinsContainer>
      <Title>Покупка золотых монет</Title>
      <CoinsGrid>
        {packages.map((pkg, index) => (
          <CoinPackage key={index} onClick={() => handleBuy(pkg)}>
            <CoinAmount>{pkg.coins.toLocaleString()} монет</CoinAmount>
            <BonusAmount>+{pkg.bonus.toLocaleString()} бонусных</BonusAmount>
            <Price>{pkg.price} старс</Price>
            <BuyButton>Купить</BuyButton>
          </CoinPackage>
        ))}
      </CoinsGrid>
    </BuyCoinsContainer>
  );
};

export default BuyCoins; 