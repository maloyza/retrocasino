import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 2px solid ${props => props.theme.colors.accent};
  padding: 5px 10px;
  padding-bottom: max(5px, env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 600px) {
    padding: 4px 0;
    padding-bottom: max(4px, env(safe-area-inset-bottom));
  }
`;

const NavItem = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 5px;
  min-width: 60px;
  cursor: pointer;
  transition: color 0.2s;

  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    font-size: 10px;
    min-width: 44px;
    padding: 2px 0;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      <NavItem
        onClick={() => navigate('/')}
        active={isActive('/')}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
        Игры
      </NavItem>
      <NavItem
        onClick={() => navigate('/profile')}
        active={isActive('/profile')}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        Профиль
      </NavItem>
      <NavItem
        onClick={() => navigate('/leaderboard')}
        active={isActive('/leaderboard')}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H8V7h2v4h2V7h2v10z"/>
        </svg>
        Лидеры
      </NavItem>
    </NavContainer>
  );
};

export default Navbar; 