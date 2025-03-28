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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: env(safe-area-inset-bottom);
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
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };

    // Если это не мобильное устройство, открываем в полноэкранном режиме
    if (!isMobile()) {
      // Добавляем обработчик клика для открытия в полноэкранном режиме
      const handleClick = () => {
        openFullscreen();
        // Удаляем обработчик после первого клика
        document.removeEventListener('click', handleClick);
      };

      document.addEventListener('click', handleClick);

      // Очистка обработчика при размонтировании
      return () => {
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