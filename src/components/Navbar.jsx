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

  @media (orientation: landscape) and (max-height: 600px) {
    bottom: 0;
    left: 0;
    top: 0;
    right: auto;
    width: 60px;
    flex-direction: column;
    padding: 1rem 0.5rem;
    border-right: 1px solid rgba(255, 183, 0, 0.2);
  }
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
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (orientation: landscape) and (max-height: 600px) {
    margin: 0.5rem 0;
    width: 100%;
    padding: 0.75rem 0;
  }
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 0.25rem;
  filter: ${props => props.active ? 'drop-shadow(0 0 5px ' + props.theme.colors.accent + ')' : 'none'};
  transition: filter 0.3s ease;

  @media (orientation: landscape) and (max-height: 600px) {
    width: 28px;
    height: 28px;
    margin-bottom: 0.5rem;
  }
`;

const NavLabel = styled.span`
  font-size: 0.8rem;
  transition: all 0.3s ease;

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 0.7rem;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    margin-top: 0.5rem;
  }
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