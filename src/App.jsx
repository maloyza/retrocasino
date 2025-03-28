import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  padding: 2rem;
`;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.dark};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 70px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.xl};
    padding-top: 70px;
    padding-bottom: 80px;
    height: calc(100% - 150px);
  }

  & > * {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const App = () => {
  const [isPortrait, setIsPortrait] = useState(true);
  const [showOrientationWarning, setShowOrientationWarning] = useState(false);

  useEffect(() => {
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isPortraitMode);
      setShowOrientationWarning(isMobile() && !isPortraitMode);
    };

    const initTelegramWebApp = () => {
      try {
        if (window.Telegram?.WebApp) {
          // Получаем объект WebApp
          const WebApp = window.Telegram.WebApp;

          // Сообщаем что приложение готово
          WebApp.ready();

          // Устанавливаем параметры отображения
          WebApp.expand();
          WebApp.enableClosingConfirmation();
          
          // Устанавливаем тему
          WebApp.setHeaderColor('#000000');
          WebApp.setBackgroundColor('#000000');

          // Проверяем, что приложение действительно развернулось
          const viewportHeight = WebApp.viewportHeight;
          const viewportWidth = WebApp.viewportWidth;
          
          console.log('TWA viewport size:', { width: viewportWidth, height: viewportHeight });
          console.log('TWA isExpanded:', WebApp.isExpanded);

          // Если не развернулось, пробуем еще раз
          if (!WebApp.isExpanded) {
            setTimeout(() => {
              WebApp.expand();
              console.log('TWA second expand attempt');
            }, 100);
          }
        } else {
          console.log('TWA not available');
        }
      } catch (error) {
        console.error('TWA initialization error:', error);
      }
    };

    // Проверяем ориентацию
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Инициализируем TWA
    initTelegramWebApp();

    // Добавляем обработчик для повторной инициализации
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(initTelegramWebApp, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Пробуем повторно развернуть через небольшую задержку
    setTimeout(initTelegramWebApp, 500);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (showOrientationWarning) {
    return (
      <ThemeProvider theme={theme}>
        <OrientationWarning>
          <h2>Пожалуйста, переверните устройство</h2>
          <p>Для лучшего игрового опыта рекомендуется использовать портретную ориентацию</p>
        </OrientationWarning>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/retrocasino">
        <GlobalStyle />
        <AppContainer className="app-container">
          <Balance />
          <MainContent className="main-content">
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
      </Router>
    </ThemeProvider>
  );
};

export default App; 