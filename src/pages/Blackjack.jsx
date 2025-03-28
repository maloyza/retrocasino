import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';
import { Howl } from 'howler';

const BlackjackContainer = styled.div`
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
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`;

const DealerArea = styled.div`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PlayerArea = styled.div`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Card = styled(motion.div)`
  width: 70px;
  height: 100px;
  background: ${props => props.isHidden ? '#2a2a2a' : '#fff'};
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

const Blackjack = () => {
  const [deck, setDeck] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); // betting, playing, dealer, ended
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('');

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

  // Подсчет очков
  const calculateScore = (hand) => {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
      if (card.value === 'A') {
        aces++;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }

    for (let i = 0; i < aces; i++) {
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
    }

    return score;
  };

  // Начало игры
  const startGame = () => {
    if (bet <= 0 || bet > balance) return;

    const newDeck = [...deck];
    const playerCards = [newDeck.pop(), newDeck.pop()];
    const dealerCards = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameState('playing');
    setBalance(prev => prev - bet);
    cardSound.play();
  };

  // Взять карту
  const hit = () => {
    const newDeck = [...deck];
    const newCard = newDeck.pop();
    
    setDeck(newDeck);
    setPlayerHand(prev => [...prev, newCard]);
    cardSound.play();

    const newScore = calculateScore([...playerHand, newCard]);
    if (newScore > 21) {
      endGame('bust');
    }
  };

  // Остановиться
  const stand = () => {
    setGameState('dealer');
    dealerTurn();
  };

  // Ход дилера
  const dealerTurn = () => {
    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];
    
    while (calculateScore(currentDealerHand) < 17) {
      const newCard = currentDeck.pop();
      currentDealerHand.push(newCard);
      cardSound.play();
    }

    setDealerHand(currentDealerHand);
    setDeck(currentDeck);

    const dealerScore = calculateScore(currentDealerHand);
    const playerScore = calculateScore(playerHand);

    if (dealerScore > 21) {
      endGame('dealer_bust');
    } else if (dealerScore > playerScore) {
      endGame('dealer_win');
    } else if (dealerScore < playerScore) {
      endGame('player_win');
    } else {
      endGame('push');
    }
  };

  // Завершение игры
  const endGame = (result) => {
    setGameState('ended');
    let winnings = 0;
    let message = '';

    switch (result) {
      case 'player_win':
        winnings = bet * 2;
        message = 'Вы выиграли!';
        winSound.play();
        break;
      case 'dealer_bust':
        winnings = bet * 2;
        message = 'Дилер перебрал! Вы выиграли!';
        winSound.play();
        break;
      case 'dealer_win':
        message = 'Дилер выиграл!';
        loseSound.play();
        break;
      case 'bust':
        message = 'Перебор! Вы проиграли!';
        loseSound.play();
        break;
      case 'push':
        winnings = bet;
        message = 'Ничья!';
        break;
    }

    setMessage(message);
    setBalance(prev => prev + winnings);
  };

  // Новая игра
  const newGame = () => {
    setDealerHand([]);
    setPlayerHand([]);
    setGameState('betting');
    setBet(0);
    setMessage('');
  };

  return (
    <BlackjackContainer>
      <Balance balance={balance} />
      <GameTable>
        <DealerArea>
          {dealerHand.map((card, index) => (
            <Card
              key={index}
              suit={card.suit}
              value={card.value}
              isHidden={gameState === 'playing' && index === 1}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </DealerArea>
        <PlayerArea>
          {playerHand.map((card, index) => (
            <Card
              key={index}
              suit={card.suit}
              value={card.value}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </PlayerArea>
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
            <div>Ваши очки: {calculateScore(playerHand)}</div>
            <Controls>
              <Button onClick={hit}>Взять карту</Button>
              <Button onClick={stand}>Остановиться</Button>
            </Controls>
          </div>
        )}
        {gameState === 'dealer' && (
          <div>Ход дилера...</div>
        )}
        {gameState === 'ended' && (
          <div>
            <div>{message}</div>
            <Button onClick={newGame}>Новая игра</Button>
          </div>
        )}
      </GameInfo>
    </BlackjackContainer>
  );
};

export default Blackjack; 