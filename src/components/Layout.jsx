import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background: url('/assets/table-texture.png') repeat;
`;

const Navigation = styled.nav`
  background: ${props => props.theme.colors.secondary};
  padding: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
`;

const NavLink = styled(motion(Link))`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 12px;
  text-align: center;
  padding: 8px;
  border-radius: 5px;
  background: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <LayoutContainer>
      <Main>{children}</Main>
      <Navigation>
        <NavLink 
          to="/" 
          active={location.pathname === '/'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Игры
        </NavLink>
        <NavLink 
          to="/shop" 
          active={location.pathname === '/shop'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Магазин
        </NavLink>
        <NavLink 
          to="/profile" 
          active={location.pathname === '/profile'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Профиль
        </NavLink>
        <NavLink 
          to="/leaderboard" 
          active={location.pathname === '/leaderboard'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Топ
        </NavLink>
      </Navigation>
    </LayoutContainer>
  );
};

export default Layout; 