# Retro Casino

Демонстрационное веб-приложение казино в ретро-стиле с тремя играми: блэкджек, видеопокер и рулетка.

## Особенности

- Три классические игры казино
- Система ежедневного начисления игровой валюты
- Два вида монет (золотые и цветные)
- Система лидерборда
- Система уровней
- Магазин предметов
- Реферальная программа

## Технологии

- React
- Vite
- Styled Components
- Framer Motion
- React Router

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/retro-casino.git
cd retro-casino
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите проект:
```bash
npm start
```

## Структура проекта

```
retro-casino/
├── src/
│   ├── components/
│   │   ├── Balance.jsx
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Blackjack.jsx
│   │   ├── VideoPoker.jsx
│   │   ├── Roulette.jsx
│   │   ├── Shop.jsx
│   │   ├── Profile.jsx
│   │   └── Leaderboard.jsx
│   ├── styles/
│   │   ├── theme.js
│   │   └── GlobalStyle.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── assets/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Игры

### Блэкджек
- Стандартные правила
- Валюта: синие монеты
- При победе конвертация в золотые монеты

### Видеопокер
- Классические правила
- Валюта: зеленые монеты
- При победе конвертация в золотые монеты

### Рулетка
- Европейская рулетка (одно нулевое поле)
- Валюта: красные монеты
- При победе конвертация в золотые монеты

## Разработка

Проект использует Vite для быстрой разработки. Для запуска в режиме разработки:

```bash
npm run dev
```

Для сборки проекта:

```bash
npm run build
```

## Лицензия

MIT #   r e t r o c a s i n o  
 