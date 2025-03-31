import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Blackjack from './pages/Blackjack';
import VideoPoker from './pages/VideoPoker';
import Roulette from './pages/Roulette';
import Balance from './components/Balance';

const OrientationWarning = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.gradients.dark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  text-align: center;
  padding: 2rem;
  border: 4px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 20px rgba(255, 183, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid ${({ theme }) => theme.colors.accent};
    pointer-events: none;
  }

  h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
    animation: glow 1.5s ease-in-out infinite alternate;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    max-width: 280px;
    line-height: 1.4;
    margin-bottom: 1rem;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: '↺';
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.accent};
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
    animation: rotate 2s infinite linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px ${({ theme }) => theme.colors.accent},
                   0 0 20px ${({ theme }) => theme.colors.accent}, 0 0 25px ${({ theme }) => theme.colors.accent};
    }
    to {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px ${({ theme }) => theme.colors.accent},
                   0 0 40px ${({ theme }) => theme.colors.accent}, 0 0 50px ${({ theme }) => theme.colors.accent};
    }
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 60px;
  padding-bottom: 70px;
`;

const BalanceWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${props => props.theme.colors.accent};
`;

const AppContent = () => {
  return (
    <AppContainer>
      <BalanceWrapper>
        <Balance />
      </BalanceWrapper>
      <MainContent>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/blackjack" element={<Blackjack />} />
            <Route path="/video-poker" element={<VideoPoker />} />
            <Route path="/roulette" element={<Roulette />} />
          </Routes>
        </AnimatePresence>
      </MainContent>
      <Navbar />
    </AppContainer>
  );
};

const App = () => {
  useEffect(() => {
    const initTelegramWebApp = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Сначала сообщаем о готовности
        tg.ready();
        
        // Устанавливаем цвета для корректного отображения
        tg.setBackgroundColor('#000000');
        tg.setHeaderColor('#000000');
        
        // Отключаем свайп для закрытия
        tg.enableClosingConfirmation();
        
        // Запрашиваем полноэкранный режим
        tg.expand();
        
        // Запрашиваем полноэкранный режим через postEvent
        if (window.TelegramWebviewProxy) {
          window.TelegramWebviewProxy.postEvent('web_app_request_fullscreen', null);
        } else if (window.external && window.external.notify) {
          window.external.notify(JSON.stringify({
            eventType: 'web_app_request_fullscreen',
            eventData: null
          }));
        }

        // Добавляем обработчик для отслеживания изменений viewport
        tg.onEvent('viewportChanged', () => {
          if (!tg.isExpanded) {
            tg.expand();
          }
        });
      }
    };

    // Инициализируем с небольшой задержкой
    setTimeout(initTelegramWebApp, 50);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/retrocasino">
        <GlobalStyle />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App; 