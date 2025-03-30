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
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.primary};
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  button {
    font-family: ${props => props.theme.fonts.primary};
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    color: inherit;
    font-size: inherit;
    
    &:focus {
      outline: none;
    }
  }

  input {
    font-family: ${props => props.theme.fonts.primary};
    border: none;
    outline: none;
    background: none;
    color: inherit;
    font-size: inherit;
    
    &:focus {
      outline: none;
    }
  }

  /* Стили для игровых компонентов */
  .game-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    gap: 20px;
    min-height: calc(100vh - 130px); /* Учитываем высоту баланса и навигации */
  }

  .game-button {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.black};
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    transition: transform 0.2s;
    width: 100%;
    max-width: 300px;
    text-align: center;

    &:active {
      transform: scale(0.95);
    }
  }

  .game-card {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid ${props => props.theme.colors.accent};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
    margin: 10px 0;
  }

  /* Стили для баланса */
  .balance-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: ${props => props.theme.gradients.dark};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 60px;
    border-bottom: 2px solid ${props => props.theme.colors.game.border};

    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      height: 70px;
      padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    }
  }

  .balance-item {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.sm};
    background: ${props => props.theme.gradients.primary};
    border-radius: ${props => props.theme.borderRadius.medium};
    border: 2px solid ${props => props.theme.colors.accent};
    box-shadow: ${props => props.theme.shadows.button};
  }

  .balance-amount {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Стили для навигации */
  .nav-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props => props.theme.gradients.dark};
    padding: ${props => props.theme.spacing.sm};
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    border-top: 2px solid ${props => props.theme.colors.game.border};
    z-index: 1000;

    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      height: 80px;
      padding: ${props => props.theme.spacing.md};
    }
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    padding: ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.medium};
    transition: ${props => props.theme.transitions.default};

    &:hover, &.active {
      background: ${props => props.theme.gradients.primary};
      transform: translateY(-2px);
    }
  }

  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .slide-up {
    animation: slideUp 0.3s ease-in-out;
  }

  /* Стили для полноэкранного режима */
  :fullscreen,
  :-webkit-full-screen,
  :-moz-full-screen,
  :-ms-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100% !important;
    height: 100% !important;
    background: ${props => props.theme.colors.background};
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
    padding: 20px;
    padding-top: 80px; /* Учитываем высоту баланса */
    padding-bottom: 90px; /* Учитываем высоту навигации */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Стили для лидерборда */
  .leaderboard-container {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: calc(100vh - 130px);
  }

  /* Стили для профиля */
  .profile-container {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: calc(100vh - 130px);
  }

  .profile-card {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid ${props => props.theme.colors.accent};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px;
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
      width: 100vw;
    }

    .main-content {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 150px); // Учитываем высоту баланса и навигации
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

    .game-container {
      max-width: 1200px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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

    .game-container {
      padding: ${props => props.theme.spacing.sm};
      gap: 0.5rem;
    }

    .game-button {
      min-width: 100px;
      padding: 0.5rem;
      font-size: 0.7rem;
    }

    .game-card {
      min-width: 40px;
      max-width: 80px;
    }

    .game-table {
      max-width: 100%;
      padding: 0.5rem;
    }
  }

  /* Стили для ландшафтной ориентации */
  @media (max-height: 480px) and (orientation: landscape) {
    .game-container {
      padding: 0.5rem;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }

    .balance-container {
      height: 50px;
      padding: 0.25rem 0.5rem;
    }

    .nav-container {
      height: 60px;
      padding: 0.25rem;
    }

    .main-content {
      padding-top: 50px;
      padding-bottom: 60px;
    }
  }

  /* Стили для десктопной версии */
  @media (min-width: 768px) {
    #root {
      max-width: 1200px;
      margin: 0 auto;
      height: 100vh;
      border-left: 2px solid ${props => props.theme.colors.accent};
      border-right: 2px solid ${props => props.theme.colors.accent};
    }

    /* Стилизация скроллбара */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background};
    }

    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.accent};
      border-radius: 4px;
    }

    .game-container {
      padding: 40px;
      gap: 30px;
    }

    .game-card {
      padding: 30px;
      margin: 15px 0;
    }

    .main-content {
      padding: 40px;
      padding-top: 100px;
      padding-bottom: 110px;
    }

    .profile-container,
    .leaderboard-container {
      padding: 40px;
      gap: 30px;
    }

    .profile-card {
      padding: 30px;
      margin-bottom: 30px;
    }

    .game-button {
      padding: 15px 30px;
      font-size: 18px;
      max-width: 400px;
    }
  }
`;

export default GlobalStyle; 