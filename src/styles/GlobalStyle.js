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
    width: 100%;
    position: fixed;
    background: ${props => props.theme.colors.primary};
    overflow: hidden;
    font-family: ${props => props.theme.fonts.primary};
  }

  body {
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior: none;
    line-height: 1.5;
  }

  #root {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Стили для игровых компонентов */
  .game-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: ${props => props.theme.spacing.md};
    background: ${props => props.theme.colors.game.background};
    border: 2px solid ${props => props.theme.colors.game.border};
    border-radius: ${props => props.theme.borderRadius.large};
    box-shadow: ${props => props.theme.shadows.card};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    overflow-x: hidden;

    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      padding: ${props => props.theme.spacing.lg};
      gap: 1.5rem;
      max-width: 1200px;
    }
  }

  .game-button {
    ${props => props.theme.gameStyles.button};
    margin: ${props => props.theme.spacing.sm};
    min-width: 120px;
    max-width: 200px;
    white-space: nowrap;
  }

  .game-card {
    ${props => props.theme.gameStyles.card};
    margin: ${props => props.theme.spacing.xs};
    min-width: 60px;
    max-width: 100px;
    aspect-ratio: 2/3;
  }

  .game-table {
    ${props => props.theme.gameStyles.table};
    margin-bottom: ${props => props.theme.spacing.md};
    width: 100%;
    max-width: 600px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn ${props => props.theme.transitions.default};
  }

  .slide-up {
    animation: slideUp ${props => props.theme.transitions.default};
  }

  /* Стили для полноэкранного режима */
  :fullscreen {
    background: ${props => props.theme.colors.primary};
  }

  :-webkit-full-screen {
    background: ${props => props.theme.colors.primary};
  }

  :-moz-full-screen {
    background: ${props => props.theme.colors.primary};
  }

  :-ms-fullscreen {
    background: ${props => props.theme.colors.primary};
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
`;

export default GlobalStyle; 