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
    width: 100vw;
    height: 100vh;
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
    height: calc(100vh - 150px);
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

    const openFullscreen = () => {
      const element = document.documentElement;
      try {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      } catch (error) {
        console.error('Failed to open fullscreen:', error);
      }
    };

    // Проверяем ориентацию при загрузке и при изменении размера окна
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Если это не мобильное устройство, пытаемся открыть в полноэкранном режиме
    if (!isMobile()) {
      // Пробуем открыть полноэкранный режим при загрузке
      const handleLoad = () => {
        setTimeout(openFullscreen, 100); // Небольшая задержка для гарантированного открытия
        window.removeEventListener('load', handleLoad);
      };

      window.addEventListener('load', handleLoad);

      // Добавляем обработчик клика как запасной вариант
      const handleClick = () => {
        openFullscreen();
        document.removeEventListener('click', handleClick);
      };

      document.addEventListener('click', handleClick);

      // Добавляем обработчик клавиши F11
      const handleKeyPress = (e) => {
        if (e.key === 'F11') {
          e.preventDefault();
          openFullscreen();
        }
      };

      document.addEventListener('keydown', handleKeyPress);

      // Добавляем обработчик изменения размера окна
      const handleResize = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          openFullscreen();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('load', handleLoad);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('resize', handleResize);
      };
    }

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