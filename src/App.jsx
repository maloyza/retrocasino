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
  height: 100%;
  min-height: 100vh;
  min-height: calc(100vh - env(safe-area-inset-bottom));
  width: 100%;
  max-width: 100vw;
  background: ${props => props.theme.colors.background};
  position: relative;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  position: relative;
  padding-top: 60px;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
`;

const BalanceWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding-top: max(env(safe-area-inset-top), 10px);
  height: 60px;
  display: flex;
  align-items: center;
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

      // Автоматическое расширение на весь экран
      const requestFullscreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        }
      };

      // Запускаем расширение на весь экран после небольшой задержки
      setTimeout(requestFullscreen, 1000);
      
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