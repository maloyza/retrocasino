// Конфигурация Telegram Web App
export const TELEGRAM_CONFIG = {
  // Токен вашего бота (получите у @BotFather)
  BOT_TOKEN: import.meta.env.VITE_BOT_TOKEN,
  
  // URL вашего приложения после деплоя
  APP_URL: import.meta.env.VITE_APP_URL,
  
  // Настройки приложения
  APP_NAME: import.meta.env.VITE_APP_TITLE,
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  
  // Настройки темы
  THEME: {
    HEADER_COLOR: '#8b4513',
    BACKGROUND_COLOR: '#1a472a',
    TEXT_COLOR: '#ffffff'
  }
}; 