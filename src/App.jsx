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

  @media (orientation: landscape) and (max-height: 600px) {
    flex-direction: row;
    padding: 0;
    gap: 0;
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

  @media (orientation: landscape) and (max-height: 600px) {
    padding: ${({ theme }) => theme.spacing.sm};
    padding-top: 50px;
    padding-left: 70px;
    padding-right: ${({ theme }) => theme.spacing.sm};
    height: 100%;
    justify-content: center;

    & > * {
      max-width: calc(100vw - 80px);
    }
  }

  & > * {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const twa = window.Telegram.WebApp;
    
    if (twa) {
      twa.disableSwipeToClose();
      
      // Показываем кнопку "назад" только если мы не на главной странице
      if (location.pathname !== '/') {
        twa.BackButton.show();
      } else {
        twa.BackButton.hide();
      }
      
      // Обработка кнопки "назад"
      twa.BackButton.onClick(() => {
        navigate(-1);
      });
    }
    
    // Предотвращаем стандартное поведение свайпа
    const handleTouchMove = (e) => {
      const touchDelta = e.touches[0].clientY - e.touches[0].clientY;
      if (Math.abs(touchDelta) > 10) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [navigate, location]);

  return (
    <AppContainer>
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/blackjack" element={<Blackjack />} />
          <Route path="/video-poker" element={<VideoPoker />} />
          <Route path="/roulette" element={<Roulette />} />
        </Routes>
      </MainContent>
      <Navbar />
    </AppContainer>
  );
};

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

    // Получаем объект Telegram WebApp
    const twa = window.Telegram.WebApp;
    
    // Отключаем свайп для закрытия приложения
    if (twa) {
      twa.disableSwipeToClose();
      
      // Обработка кнопки "назад"
      twa.BackButton.onClick(() => {
        // Здесь будет логика навигации внутри приложения
        console.log('Back button clicked');
        // Пример: history.goBack();
      });
      
      // Показываем кнопку "назад" когда нужно
      // twa.BackButton.show();
    }
    
    // Предотвращаем стандартное поведение свайпа
    const handleTouchMove = (e) => {
      const touchDelta = e.touches[0].clientY - e.touches[0].clientY;
      if (Math.abs(touchDelta) > 10) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Проверяем ориентацию
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Инициализируем TWA с небольшой задержкой
    setTimeout(initTelegramWebApp, 100);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      document.removeEventListener('touchmove', handleTouchMove);
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
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App; 