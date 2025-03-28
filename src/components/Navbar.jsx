import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.text};
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 69, 19, 0.2);
  }
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 0.25rem;
`;

const NavLabel = styled.span`
  font-size: 0.8rem;
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavItem to="/" active={location.pathname === '/'}>
        <NavIcon src="/assets/icons/home.png" alt="Home" />
        <NavLabel>Главная</NavLabel>
      </NavItem>
      <NavItem to="/profile" active={location.pathname === '/profile'}>
        <NavIcon src="/assets/icons/profile.png" alt="Profile" />
        <NavLabel>Профиль</NavLabel>
      </NavItem>
      <NavItem to="/leaderboard" active={location.pathname === '/leaderboard'}>
        <NavIcon src="/assets/icons/leaderboard.png" alt="Leaderboard" />
        <NavLabel>Таблица</NavLabel>
      </NavItem>
    </NavContainer>
  );
};

export default Navbar; 