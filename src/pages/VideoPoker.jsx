import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';
import { Howl } from 'howler';

const VideoPokerContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: url('/assets/background.png') center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const GameTable = styled.div`
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16/9;
  background: rgba(0, 0, 0, 0.7);
  border: 4px solid #8b4513;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Card = styled(motion.div)`
  width: 70px;
  height: 100px;
  background: ${props => props.isHeld ? '#2a2a2a' : '#fff'};
  border: ${props => props.isHeld ? '2px solid #ffd700' : 'none'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${props => props.suit === '♥' || props.suit === '♦' ? '#ff0000' : '#000'};
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  user-select: none;

  &::before {
    content: '${props => props.value}';
    position: absolute;
    top: 5px;
    left: 5px;
  }

  &::after {
    content: '${props => props.suit}';
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 70px;
    font-size: 1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  background: #8b4513;
  color: #ffd700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #a0522d;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.7rem;
  }
`;

const GameInfo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PayTable = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #ffd700;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const VideoPoker = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); // betting, playing, ended
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('');
  const [heldCards, setHeldCards] = useState([]);

  // Звуковые эффекты
  const cardSound = new Howl({
    src: ['/assets/sounds/card.mp3'],
    volume: 0.5
  });

  const winSound = new Howl({
    src: ['/assets/sounds/win.mp3'],
    volume: 0.7
  });

  const loseSound = new Howl({
    src: ['/assets/sounds/lose.mp3'],
    volume: 0.7
  });

  // Инициализация колоды
  useEffect(() => {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const newDeck = [];
    
    for (let suit of suits) {
      for (let value of values) {
        newDeck.push({ suit, value });
      }
    }
    
    setDeck(shuffleDeck(newDeck));
  }, []);

  // Перемешивание колоды
  const shuffleDeck = (deck) => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };

  // Начало игры
  const startGame = () => {
    if (bet <= 0 || bet > balance) return;

    const newDeck = [...deck];
    const newHand = [];
    
    for (let i = 0; i < 5; i++) {
      newHand.push(newDeck.pop());
    }

    setDeck(newDeck);
    setHand(newHand);
    setGameState('playing');
    setBalance(prev => prev - bet);
    setHeldCards([]);
    cardSound.play();
  };

  // Удержание карты
  const toggleHold = (index) => {
    if (gameState !== 'playing') return;
    
    setHeldCards(prev => {
      const newHeld = [...prev];
      if (newHeld.includes(index)) {
        return newHeld.filter(i => i !== index);
      } else {
        return [...newHeld, index];
      }
    });
  };

  // Замена карт
  const draw = () => {
    const newDeck = [...deck];
    const newHand = [...hand];
    
    for (let i = 0; i < 5; i++) {
      if (!heldCards.includes(i)) {
        newHand[i] = newDeck.pop();
        cardSound.play();
      }
    }

    setDeck(newDeck);
    setHand(newHand);
    setGameState('ended');
    evaluateHand(newHand);
  };

  // Оценка комбинации
  const evaluateHand = (hand) => {
    const values = hand.map(card => card.value);
    const suits = hand.map(card => card.suit);
    const isFlush = suits.every(suit => suit === suits[0]);
    const valueCounts = values.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    let winnings = 0;
    let message = '';

    // Проверка комбинаций от старшей к младшей
    if (isRoyalFlush(values, suits)) {
      winnings = bet * 250;
      message = 'Роял-флеш!';
    } else if (isStraightFlush(values, suits)) {
      winnings = bet * 50;
      message = 'Стрит-флеш!';
    } else if (isFourOfAKind(valueCounts)) {
      winnings = bet * 25;
      message = 'Каре!';
    } else if (isFullHouse(valueCounts)) {
      winnings = bet * 15;
      message = 'Фулл-хаус!';
    } else if (isFlush) {
      winnings = bet * 10;
      message = 'Флеш!';
    } else if (isStraight(values)) {
      winnings = bet * 8;
      message = 'Стрит!';
    } else if (isThreeOfAKind(valueCounts)) {
      winnings = bet * 5;
      message = 'Тройка!';
    } else if (isTwoPair(valueCounts)) {
      winnings = bet * 3;
      message = 'Две пары!';
    } else if (isPair(valueCounts)) {
      winnings = bet * 2;
      message = 'Пара!';
    } else {
      message = 'Нет комбинации';
    }

    setMessage(message);
    setBalance(prev => prev + winnings);

    if (winnings > 0) {
      winSound.play();
    } else {
      loseSound.play();
    }
  };

  // Проверка комбинаций
  const isRoyalFlush = (values, suits) => {
    const royalValues = ['10', 'J', 'Q', 'K', 'A'];
    return isStraightFlush(values, suits) && 
           values.every(val => royalValues.includes(val));
  };

  const isStraightFlush = (values, suits) => {
    return isFlush && isStraight(values);
  };

  const isFourOfAKind = (valueCounts) => {
    return Object.values(valueCounts).includes(4);
  };

  const isFullHouse = (valueCounts) => {
    return Object.values(valueCounts).includes(3) && 
           Object.values(valueCounts).includes(2);
  };

  const isFlush = (suits) => {
    return suits.every(suit => suit === suits[0]);
  };

  const isStraight = (values) => {
    const sortedValues = values
      .map(val => val === 'A' ? 14 : val === 'K' ? 13 : val === 'Q' ? 12 : 
                  val === 'J' ? 11 : parseInt(val))
      .sort((a, b) => a - b);
    
    for (let i = 1; i < sortedValues.length; i++) {
      if (sortedValues[i] !== sortedValues[i-1] + 1) return false;
    }
    return true;
  };

  const isThreeOfAKind = (valueCounts) => {
    return Object.values(valueCounts).includes(3);
  };

  const isTwoPair = (valueCounts) => {
    // Проверяем только пары от вальтов и выше
    const highCards = ['J', 'Q', 'K', 'A'];
    const pairs = Object.entries(valueCounts)
      .filter(([value, count]) => count === 2 && highCards.includes(value));
    return pairs.length === 2;
  };

  const isPair = (valueCounts) => {
    // Проверяем только пары от вальтов и выше
    const highCards = ['J', 'Q', 'K', 'A'];
    return Object.entries(valueCounts).some(([value, count]) => 
      count === 2 && highCards.includes(value)
    );
  };

  // Новая игра
  const newGame = () => {
    setHand([]);
    setGameState('betting');
    setBet(0);
    setMessage('');
    setHeldCards([]);
  };

  return (
    <VideoPokerContainer>
      <Balance balance={balance} />
      <GameTable>
        <CardsContainer>
          {hand.map((card, index) => (
            <Card
              key={index}
              suit={card.suit}
              value={card.value}
              isHeld={heldCards.includes(index)}
              onClick={() => toggleHold(index)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </CardsContainer>
      </GameTable>
      
      <GameInfo>
        {gameState === 'betting' && (
          <div>
            <input
              type="number"
              min="1"
              max={balance}
              value={bet}
              onChange={(e) => setBet(parseInt(e.target.value) || 0)}
              style={{ marginRight: '1rem' }}
            />
            <Button onClick={startGame}>Начать игру</Button>
          </div>
        )}
        {gameState === 'playing' && (
          <div>
            <div>Выберите карты для удержания</div>
            <Controls>
              <Button onClick={draw}>Заменить карты</Button>
            </Controls>
          </div>
        )}
        {gameState === 'ended' && (
          <div>
            <div>{message}</div>
            <Button onClick={newGame}>Новая игра</Button>
          </div>
        )}
      </GameInfo>

      <PayTable>
        <div>Роял-флеш: x250</div>
        <div>Стрит-флеш: x50</div>
        <div>Каре: x25</div>
        <div>Фулл-хаус: x15</div>
        <div>Флеш: x10</div>
        <div>Стрит: x8</div>
        <div>Тройка: x5</div>
        <div>Две пары: x3</div>
        <div>Пара: x2</div>
      </PayTable>
    </VideoPokerContainer>
  );
};

export default VideoPoker; 