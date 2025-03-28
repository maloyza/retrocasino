import { useEffect, useState } from 'react';
import { TELEGRAM_CONFIG } from '../config/telegram';

const useTelegram = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      setTg(telegram);
      setUser(telegram.initDataUnsafe?.user || null);
      
      // Инициализация приложения
      telegram.ready();
      
      // Установка цветов из конфигурации
      telegram.setHeaderColor(TELEGRAM_CONFIG.THEME.HEADER_COLOR);
      telegram.setBackgroundColor(TELEGRAM_CONFIG.THEME.BACKGROUND_COLOR);
      
      // Расширяем на весь экран
      telegram.expand();

      // Добавляем обработчики событий
      telegram.onEvent('mainButtonClicked', () => {
        // Обработка нажатия главной кнопки
        console.log('Main button clicked');
      });

      telegram.onEvent('backButtonClicked', () => {
        // Обработка нажатия кнопки назад
        console.log('Back button clicked');
      });
    }
  }, []);

  // Функция для отправки данных на сервер
  const sendData = async (data) => {
    if (!tg) return;

    try {
      const response = await fetch(`${TELEGRAM_CONFIG.APP_URL}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-Bot-Token': TELEGRAM_CONFIG.BOT_TOKEN
        },
        body: JSON.stringify({
          ...data,
          user: user
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  };

  return { 
    tg, 
    user,
    sendData,
    config: TELEGRAM_CONFIG
  };
};

export default useTelegram; 