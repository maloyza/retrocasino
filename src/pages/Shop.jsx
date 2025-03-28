import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background: url('/assets/shop-bg.jpg') center/cover;
`;

const ShopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const ShopSection = styled.div`
  background: ${props => props.theme.colors.secondary};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  margin-bottom: 20px;
  text-align: center;
`;

const ItemCard = styled(motion.div)`
  background: ${props => props.theme.colors.primary};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
`;

const ItemPrice = styled.div`
  color: ${props => props.theme.colors.accent};
  font-size: 18px;
  margin-bottom: 10px;
`;

const BuyButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.primary};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Shop = () => {
  const [balance, setBalance] = useState({
    blueCoins: 1000,
    greenCoins: 1000,
    redCoins: 1000,
    goldCoins: 100
  });

  const coinsPackages = [
    {
      id: 1,
      name: '600 монет',
      price: 99,
      bonus: 1200,
      currency: 'stars'
    },
    {
      id: 2,
      name: '3000 монет',
      price: 499,
      bonus: 6000,
      currency: 'stars'
    },
    {
      id: 3,
      name: '9800 монет',
      price: 1499,
      bonus: 19600,
      currency: 'stars'
    }
  ];

  const avatars = [
    {
      id: 1,
      name: 'Премиум аватар 1',
      price: 10000,
      currency: 'gold',
      image: '/assets/avatar1.jpg'
    },
    {
      id: 2,
      name: 'Премиум аватар 2',
      price: 999,
      currency: 'stars',
      image: '/assets/avatar2.jpg'
    }
  ];

  const cardSkins = [
    {
      id: 1,
      name: 'Золотой скин карт',
      price: 50000,
      currency: 'gold',
      image: '/assets/card-skin1.jpg'
    },
    {
      id: 2,
      name: 'Премиум скин карт',
      price: 2499,
      currency: 'stars',
      image: '/assets/card-skin2.jpg'
    }
  ];

  const handleBuy = (item) => {
    // Здесь будет логика покупки
    console.log('Buying:', item);
  };

  return (
    <ShopContainer>
      <Balance {...balance} />
      
      <ShopSection>
        <SectionTitle>Пакеты монет</SectionTitle>
        <ShopGrid>
          {coinsPackages.map(pack => (
            <ItemCard
              key={pack.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ItemTitle>{pack.name}</ItemTitle>
              <ItemPrice>
                {pack.price} {pack.currency === 'stars' ? '⭐' : '🪙'}
                {pack.bonus && ` + ${pack.bonus} бонус`}
              </ItemPrice>
              <BuyButton
                onClick={() => handleBuy(pack)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Купить
              </BuyButton>
            </ItemCard>
          ))}
        </ShopGrid>
      </ShopSection>

      <ShopSection>
        <SectionTitle>Аватарки</SectionTitle>
        <ShopGrid>
          {avatars.map(avatar => (
            <ItemCard
              key={avatar.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ItemImage src={avatar.image} alt={avatar.name} />
              <ItemTitle>{avatar.name}</ItemTitle>
              <ItemPrice>
                {avatar.price} {avatar.currency === 'stars' ? '⭐' : '🪙'}
              </ItemPrice>
              <BuyButton
                onClick={() => handleBuy(avatar)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Купить
              </BuyButton>
            </ItemCard>
          ))}
        </ShopGrid>
      </ShopSection>

      <ShopSection>
        <SectionTitle>Скины карт</SectionTitle>
        <ShopGrid>
          {cardSkins.map(skin => (
            <ItemCard
              key={skin.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ItemImage src={skin.image} alt={skin.name} />
              <ItemTitle>{skin.name}</ItemTitle>
              <ItemPrice>
                {skin.price} {skin.currency === 'stars' ? '⭐' : '🪙'}
              </ItemPrice>
              <BuyButton
                onClick={() => handleBuy(skin)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Купить
              </BuyButton>
            </ItemCard>
          ))}
        </ShopGrid>
      </ShopSection>
    </ShopContainer>
  );
};

export default Shop; 