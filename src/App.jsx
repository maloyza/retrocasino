import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blackjack from './pages/Blackjack';
import VideoPoker from './pages/VideoPoker';
import Roulette from './pages/Roulette';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import useTelegram from './hooks/useTelegram';

const App = () => {
  const { tg, user } = useTelegram();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blackjack" element={<Blackjack />} />
            <Route path="/video-poker" element={<VideoPoker />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App; 