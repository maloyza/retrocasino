const theme = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#2a2a2a',
    accent: '#ffd700',
    text: '#ffffff',
    error: '#ff0000',
    success: '#00ff00',
    button: {
      primary: '#8b4513',
      hover: '#a0522d',
      text: '#ffd700'
    },
    game: {
      background: '#000000',
      border: '#8b4513',
      card: '#ffffff',
      table: '#006400',
      chip: '#ffd700',
      highlight: '#ff4500'
    }
  },
  fonts: {
    primary: "'Press Start 2P', cursive",
    secondary: "'VT323', monospace"
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px'
  },
  shadows: {
    card: '0 4px 8px rgba(0, 0, 0, 0.5)',
    button: '0 2px 4px rgba(0, 0, 0, 0.3)',
    hover: '0 6px 12px rgba(0, 0, 0, 0.6)'
  },
  gradients: {
    primary: 'linear-gradient(45deg, #8b4513, #a0522d)',
    accent: 'linear-gradient(45deg, #ffd700, #ffa500)',
    dark: 'linear-gradient(to bottom, #1a1a1a, #000000)'
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out'
  },
  gameStyles: {
    table: {
      border: '2px solid #8b4513',
      borderRadius: '16px',
      padding: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
    },
    card: {
      background: '#ffffff',
      border: '2px solid #000000',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    button: {
      background: '#8b4513',
      color: '#ffd700',
      border: '2px solid #ffd700',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      fontFamily: "'Press Start 2P', cursive",
      cursor: 'pointer',
      transition: '0.3s ease-in-out',
      '&:hover': {
        background: '#a0522d',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      }
    }
  }
};

export default theme; 