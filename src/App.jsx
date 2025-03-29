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
  min-height: 100vh;
  min-height: calc(100vh - env(safe-area-inset-bottom));
  width: 100vw;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  padding: 10px;
  padding-top: max(10px, env(safe-area-inset-top));
  padding-bottom: calc(70px + env(safe-area-inset-bottom)); /* Учитываем высоту навбара */
`;

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    try {
      const twa = window.Telegram?.WebApp;
      
      if (twa) {
        // Отключаем свайп через MainButton, так как disableSwipeToClose не поддерживается
        twa.MainButton.setParams({
          is_visible: false
        });
        
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
    } catch (error) {
      console.error('TWA initialization error:', error);
    }
    
    // Предотвращаем стандартное поведение свайпа через CSS
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, [navigate, location]);

  return (
    <AppContainer>
      <Balance />
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
          
          // Расширяем окно приложения
          tg.expand();
          
          // Устанавливаем цвета для хедера и нижней панели
          tg.setHeaderColor('#000000');
          tg.setBackgroundColor('#000000');
          
          // Проверяем результат
          console.log('TWA viewport info:', {
            viewportHeight: tg.viewportHeight,
            viewportStableHeight: tg.viewportStableHeight,
            isExpanded: tg.isExpanded,
            headerColor: tg.headerColor,
            backgroundColor: tg.backgroundColor
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

    // Инициализируем TWA
    initTelegramWebApp();

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
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App; 