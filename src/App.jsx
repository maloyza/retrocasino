import React, { useEffect } from 'react';
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
    max-width: 1200px;
    left: 50%;
    transform: translateX(-50%);
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
  padding-top: 60px; // Для Balance компонента
  padding-bottom: 70px; // Для Navbar

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.xl};
    padding-top: 70px;
    padding-bottom: 80px;
  }

  & > * {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const App = () => {
  useEffect(() => {
    // Функция для определения мобильного устройства
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Функция для открытия в полноэкранном режиме
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

    // Если это не мобильное устройство, пытаемся открыть в полноэкранном режиме сразу
    if (!isMobile()) {
      const handleLoad = () => {
        openFullscreen();
        window.removeEventListener('load', handleLoad);
      };

      // Пробуем открыть полноэкранный режим при загрузке
      window.addEventListener('load', handleLoad);

      // Также добавляем обработчик клика как запасной вариант
      const handleClick = () => {
        openFullscreen();
        document.removeEventListener('click', handleClick);
      };

      document.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('load', handleLoad);
        document.removeEventListener('click', handleClick);
      };
    }
  }, []);

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