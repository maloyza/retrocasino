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
  background: ${({ theme }) => theme.gradients.dark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  padding: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    max-width: 280px;
    line-height: 1.4;
  }

  &::before {
    content: '↺';
    font-size: 3rem;
    margin-bottom: 1rem;
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
      setShowOrientationWarning(isMobile() && isPortraitMode);
    };

    const initTelegramWebApp = () => {
      try {
        if (window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          
          // Сообщаем что приложение готово
          tg.ready();

          // Если это мобильное устройство, используем expand()
          if (isMobile()) {
            tg.expand();
            console.log('Mobile TWA: trying to expand');
          } else {
            // Для десктопа пробуем запросить полноэкранный режим
            tg.requestFullscreen();
            console.log('Desktop TWA: requesting fullscreen');
          }

          // Проверяем результат
          console.log('TWA viewport size:', {
            viewportHeight: tg.viewportHeight,
            viewportStableHeight: tg.viewportStableHeight,
            isExpanded: tg.isExpanded
          });
        }
      } catch (error) {
        console.error('TWA initialization error:', error);
      }
    };

    // Проверяем ориентацию
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Инициализируем TWA с небольшой задержкой
    setTimeout(initTelegramWebApp, 100);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (showOrientationWarning) {
    return (
      <ThemeProvider theme={theme}>
        <OrientationWarning>
          <h2>Пожалуйста, переверните устройство</h2>
          <p>Для лучшего игрового опыта используйте горизонтальную ориентацию экрана</p>
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