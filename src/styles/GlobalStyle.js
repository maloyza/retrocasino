import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    position: fixed;
    width: 100%;
    touch-action: none;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior: none;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Стили для контейнера приложения */
  .app-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-width: 100%;
    margin: 0 auto;
  }

  /* Стили для основного контента */
  .main-content {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: env(safe-area-inset-bottom);
  }

  /* Стили для лидерборда */
  .leaderboard-container {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: env(safe-area-inset-bottom);
  }

  /* Стили для баланса */
  .balance-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    padding: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .balance-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: rgba(139, 69, 19, 0.8);
    border-radius: 8px;
    border: 2px solid ${props => props.theme.colors.accent};
  }

  .balance-amount {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.accent};
  }

  button {
    font-family: ${props => props.theme.fonts.primary};
    cursor: pointer;
    border: none;
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    padding: 10px 20px;
    border-radius: 5px;
    transition: ${props => props.theme.transitions.default};
    
    &:hover {
      background: ${props => props.theme.colors.accent};
      transform: scale(1.05);
    }
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: ${props => props.theme.transitions.default};
    
    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }

  /* Стили для полноэкранного режима на ПК */
  @media (min-width: 1024px) {
    body {
      background-size: cover;
      background-position: center;
    }

    .app-container {
      max-width: 100%;
      height: 100vh;
    }

    .main-content {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .balance-container {
      padding: 1rem;
      justify-content: center;
      gap: 2rem;
    }

    .balance-item {
      padding: 0.75rem 1.5rem;
    }

    .balance-amount {
      font-size: 1.5rem;
    }
  }

  /* Стили для мобильных устройств */
  @media (max-width: 1023px) {
    .app-container {
      max-width: 100%;
    }

    .main-content {
      padding: 0.5rem;
    }

    .balance-container {
      padding: 0.5rem;
    }

    .balance-item {
      padding: 0.5rem;
    }

    .balance-amount {
      font-size: 1rem;
    }
  }

  /* Адаптивные стили для Telegram Web App */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }

    body {
      font-size: 0.9rem;
    }

    .game-container {
      padding: 0.5rem;
    }

    .game-card {
      width: 100%;
      margin: 0.5rem 0;
    }

    .game-buttons {
      flex-direction: column;
      gap: 0.5rem;
    }

    .game-button {
      width: 100%;
      padding: 0.8rem;
    }

    .nav-menu {
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      width: 100%;
      text-align: center;
    }

    .profile-card {
      padding: 1rem;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
    }

    .profile-stats {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .leaderboard-table {
      font-size: 0.8rem;
    }

    .leaderboard-table th,
    .leaderboard-table td {
      padding: 0.5rem;
    }
  }

  /* Стили для очень маленьких экранов */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 12px;
    }

    .game-title {
      font-size: 1.2rem;
    }

    .game-description {
      font-size: 0.8rem;
    }

    .balance-amount {
      font-size: 1rem;
    }

    .nav-item {
      font-size: 0.8rem;
    }
  }

  /* Стили для ландшафтной ориентации */
  @media (max-height: 480px) and (orientation: landscape) {
    .game-container {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .game-card {
      width: calc(50% - 1rem);
      margin: 0.5rem;
    }

    .nav-menu {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      padding: 0.5rem;
      z-index: 1000;
    }
  }
`;

export default GlobalStyle; 