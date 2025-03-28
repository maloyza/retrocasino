import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';
import { Howl } from 'howler';

const RouletteContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: url('/assets/background.png') center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const WheelContainer = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  position: relative;
  margin: 2rem 0;
`;

const Wheel = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #000;
  position: relative;
  border: 4px solid #8b4513;
  overflow: hidden;
`;

const WheelNumber = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: ${props => props.color};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50%;
  transform-origin: center;
  transform: rotate(${props => props.rotation}deg) translateY(-50%);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

const Ball = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: #ffd700;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const BettingTable = styled.div`
  width: 100%;
  max-width: 800px;
  background: rgba(0, 0, 0, 0.7);
  border: 4px solid #8b4513;
  border-radius: 10px;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 0.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const BettingCell = styled(motion.div)`
  aspect-ratio: 1;
  background: ${props => props.color || '#2a2a2a'};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #fff;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }

  &.selected {
    background: #ffd700;
    color: #000;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
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

const Roulette = () => {
  const [wheelNumbers] = useState([
    { number: 0, color: '#2a2a2a' },
    { number: 32, color: '#ff0000' }, { number: 15, color: '#000000' }, { number: 19, color: '#ff0000' },
    { number: 4, color: '#000000' }, { number: 21, color: '#ff0000' }, { number: 2, color: '#000000' },
    { number: 25, color: '#ff0000' }, { number: 17, color: '#000000' }, { number: 34, color: '#ff0000' },
    { number: 6, color: '#000000' }, { number: 27, color: '#ff0000' }, { number: 13, color: '#000000' },
    { number: 36, color: '#ff0000' }, { number: 11, color: '#000000' }, { number: 30, color: '#ff0000' },
    { number: 8, color: '#000000' }, { number: 23, color: '#ff0000' }, { number: 10, color: '#000000' },
    { number: 5, color: '#ff0000' }, { number: 24, color: '#000000' }, { number: 16, color: '#ff0000' },
    { number: 33, color: '#000000' }, { number: 1, color: '#ff0000' }, { number: 20, color: '#000000' },
    { number: 14, color: '#ff0000' }, { number: 31, color: '#000000' }, { number: 9, color: '#ff0000' },
    { number: 22, color: '#000000' }, { number: 18, color: '#ff0000' }, { number: 29, color: '#000000' },
    { number: 7, color: '#ff0000' }, { number: 28, color: '#000000' }, { number: 12, color: '#ff0000' },
    { number: 35, color: '#000000' }, { number: 3, color: '#ff0000' }, { number: 26, color: '#000000' }
  ]);

  const [selectedBets, setSelectedBets] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  // Звуковые эффекты
  const spinSound = new Howl({
    src: ['/assets/sounds/spin.mp3'],
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

  // Обработка ставки
  const handleBet = (bet) => {
    if (isSpinning) return;
    
    setSelectedBets(prev => {
      if (prev.includes(bet)) {
        return prev.filter(b => b !== bet);
      }
      return [...prev, bet];
    });
  };

  // Кручение колеса
  const spinWheel = () => {
    if (isSpinning || selectedBets.length === 0 || betAmount <= 0 || betAmount > balance) return;

    setIsSpinning(true);
    setBalance(prev => prev - betAmount);
    spinSound.play();

    const totalBets = betAmount * selectedBets.length;
    const randomNumber = Math.floor(Math.random() * 37);
    const rotations = 5 + Math.random() * 5;
    const finalRotation = rotations * 360 + (randomNumber * (360 / 37));

    setResult(randomNumber);

    setTimeout(() => {
      setIsSpinning(false);
      calculateWinnings(randomNumber, totalBets);
    }, 5000);
  };

  // Подсчет выигрыша
  const calculateWinnings = (number, totalBets) => {
    let winnings = 0;
    let message = '';

    for (const bet of selectedBets) {
      if (bet === number) {
        winnings += betAmount * 35;
        message = `Выпало ${number}! Вы выиграли ${winnings}!`;
        winSound.play();
      } else if (bet === 'red' && wheelNumbers.find(n => n.number === number).color === '#ff0000') {
        winnings += betAmount;
        message = `Выпало красное! Вы выиграли ${winnings}!`;
        winSound.play();
      } else if (bet === 'black' && wheelNumbers.find(n => n.number === number).color === '#000000') {
        winnings += betAmount;
        message = `Выпало черное! Вы выиграли ${winnings}!`;
        winSound.play();
      } else if (bet === 'even' && number % 2 === 0 && number !== 0) {
        winnings += betAmount;
        message = `Выпало четное! Вы выиграли ${winnings}!`;
        winSound.play();
      } else if (bet === 'odd' && number % 2 === 1) {
        winnings += betAmount;
        message = `Выпало нечетное! Вы выиграли ${winnings}!`;
        winSound.play();
      }
    }

    if (winnings === 0) {
      message = `Выпало ${number}! Вы проиграли!`;
      loseSound.play();
    }

    setMessage(message);
    setBalance(prev => prev + winnings);
    setSelectedBets([]);
    setBetAmount(0);
  };

  // Сброс игры
  const resetGame = () => {
    setSelectedBets([]);
    setBetAmount(0);
    setResult(null);
    setMessage('');
  };

  return (
    <RouletteContainer>
      <Balance balance={balance} />
      <WheelContainer>
        <Wheel
          animate={isSpinning ? {
            rotate: [0, 360 * 5 + (result * (360 / 37))]
          } : {}}
          transition={{ duration: 5, ease: "easeOut" }}
        >
          {wheelNumbers.map((num, index) => (
            <WheelNumber
              key={num.number}
              color={num.color}
              rotation={index * (360 / 37)}
            >
              {num.number}
            </WheelNumber>
          ))}
          <Ball />
        </Wheel>
      </WheelContainer>

      <BettingTable>
        <BettingCell
          color="#2a2a2a"
          className={selectedBets.includes(0) ? 'selected' : ''}
          onClick={() => handleBet(0)}
        >
          0
        </BettingCell>
        {Array.from({ length: 36 }, (_, i) => i + 1).map(num => (
          <BettingCell
            key={num}
            color={wheelNumbers.find(n => n.number === num).color}
            className={selectedBets.includes(num) ? 'selected' : ''}
            onClick={() => handleBet(num)}
          >
            {num}
          </BettingCell>
        ))}
        <BettingCell
          color="#ff0000"
          className={selectedBets.includes('red') ? 'selected' : ''}
          onClick={() => handleBet('red')}
        >
          Красное
        </BettingCell>
        <BettingCell
          color="#000000"
          className={selectedBets.includes('black') ? 'selected' : ''}
          onClick={() => handleBet('black')}
        >
          Черное
        </BettingCell>
        <BettingCell
          color="#2a2a2a"
          className={selectedBets.includes('even') ? 'selected' : ''}
          onClick={() => handleBet('even')}
        >
          Четное
        </BettingCell>
        <BettingCell
          color="#2a2a2a"
          className={selectedBets.includes('odd') ? 'selected' : ''}
          onClick={() => handleBet('odd')}
        >
          Нечетное
        </BettingCell>
      </BettingTable>

      <GameInfo>
        <div>
          <input
            type="number"
            min="1"
            max={balance}
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value) || 0)}
            style={{ marginRight: '1rem' }}
          />
          <Button
            onClick={spinWheel}
            disabled={isSpinning || selectedBets.length === 0 || betAmount <= 0 || betAmount > balance}
          >
            Крутить
          </Button>
        </div>
        {message && (
          <div style={{ marginTop: '1rem' }}>
            {message}
            <Button onClick={resetGame} style={{ marginLeft: '1rem' }}>
              Новая игра
            </Button>
          </div>
        )}
      </GameInfo>
    </RouletteContainer>
  );
};

export default Roulette; 