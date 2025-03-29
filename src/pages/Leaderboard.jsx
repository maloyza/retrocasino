import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const LeaderboardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: url('/assets/backgrounds/leaderboard-bg.png') center/cover no-repeat;
  padding: 1rem;
  padding-top: calc(1rem + 60px);

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.5rem;
    padding-top: calc(0.5rem + 40px);
  }
`;

const LeaderboardCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.accent};
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.5rem;
    flex-direction: row;
    gap: 0.5rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (orientation: landscape) and (max-height: 600px) {
    flex-direction: column;
    margin-bottom: 0;
    width: 100px;
  }
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: ${props => props.active ? props.theme.colors.accent : 'rgba(139, 69, 19, 0.8)'};
  border: none;
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.3rem;
    font-size: 0.8rem;
  }

  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (orientation: landscape) and (max-height: 600px) {
    overflow-x: hidden;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${props => props.theme.colors.text};

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 0.8rem;
  }
`;

const TableHeader = styled.th`
  padding: 0.5rem;
  text-align: left;
  border-bottom: 2px solid ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.primary};

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.3rem;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(139, 69, 19, 0.5);

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 0.3rem;
  }
`;

const PlayerRow = styled.tr`
  &:hover {
    background: rgba(139, 69, 19, 0.2);
  }
`;

const PlayerAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;

  @media (orientation: landscape) and (max-height: 600px) {
    width: 24px;
    height: 24px;
    margin-right: 0.3rem;
  }
`;

const PlayerName = styled.span`
  display: flex;
  align-items: center;
`;

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('gold');

  // Демо-данные
  const players = [
    { id: 1, name: 'Player1', avatar: '/assets/avatars/avatar1.png', gold: 1000, wins: 50, level: 10 },
    { id: 2, name: 'Player2', avatar: '/assets/avatars/avatar2.png', gold: 800, wins: 45, level: 9 },
    { id: 3, name: 'Player3', avatar: '/assets/avatars/avatar3.png', gold: 600, wins: 40, level: 8 },
    { id: 4, name: 'Player4', avatar: '/assets/avatars/avatar4.png', gold: 500, wins: 35, level: 7 },
    { id: 5, name: 'Player5', avatar: '/assets/avatars/avatar5.png', gold: 400, wins: 30, level: 6 }
  ];

  const getValue = (player) => {
    switch (activeTab) {
      case 'gold':
        return player.gold;
      case 'wins':
        return player.wins;
      case 'level':
        return player.level;
      default:
        return 0;
    }
  };

  const formatValue = (value) => {
    switch (activeTab) {
      case 'gold':
        return `${value} 🪙`;
      case 'wins':
        return `${value} 🏆`;
      case 'level':
        return `${value} 📊`;
      default:
        return value;
    }
  };

  return (
    <LeaderboardContainer>
      <LeaderboardCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <TabsContainer>
          <Tab active={activeTab === 'gold'} onClick={() => setActiveTab('gold')}>
            Золото
          </Tab>
          <Tab active={activeTab === 'wins'} onClick={() => setActiveTab('wins')}>
            Победы
          </Tab>
          <Tab active={activeTab === 'level'} onClick={() => setActiveTab('level')}>
            Уровень
          </Tab>
        </TabsContainer>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>#</TableHeader>
                <TableHeader>Игрок</TableHeader>
                <TableHeader>Значение</TableHeader>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <PlayerRow key={player.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <PlayerName>
                      <PlayerAvatar src={player.avatar} alt={player.name} />
                      {player.name}
                    </PlayerName>
                  </TableCell>
                  <TableCell>{formatValue(getValue(player))}</TableCell>
                </PlayerRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </LeaderboardCard>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 