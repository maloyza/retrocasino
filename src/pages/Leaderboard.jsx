import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background: url('/assets/leaderboard-bg.jpg') center/cover;
`;

const LeaderboardCard = styled.div`
  background: ${props => props.theme.colors.secondary};
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? props.theme.colors.accent : props.theme.colors.primary};
  color: ${props => props.active ? props.theme.colors.black : props.theme.colors.text};
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  color: ${props => props.theme.colors.accent};
  padding: 10px;
  text-align: left;
  font-size: 14px;
  border-bottom: 2px solid ${props => props.theme.colors.accent};
`;

const TableCell = styled.td`
  color: ${props => props.theme.colors.text};
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  font-size: 14px;
`;

const PlayerRow = styled(motion.tr)`
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const RankCell = styled(TableCell)`
  width: 50px;
  text-align: center;
  font-weight: bold;
  color: ${props => {
    switch (props.rank) {
      case 1: return '#FFD700'; // золотой
      case 2: return '#C0C0C0'; // серебряный
      case 3: return '#CD7F32'; // бронзовый
      default: return props.theme.colors.text;
    }
  }};
`;

const AvatarCell = styled(TableCell)`
  width: 40px;
  padding: 5px;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: url('/assets/default-avatar.jpg') center/cover;
  border: 2px solid ${props => props.theme.colors.accent};
`;

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('gold');
  const [balance, setBalance] = useState({
    blueCoins: 1000,
    greenCoins: 1000,
    redCoins: 1000,
    goldCoins: 100
  });

  const tabs = [
    { id: 'gold', name: 'Золотые монеты' },
    { id: 'wins', name: 'Победы' },
    { id: 'level', name: 'Уровень' }
  ];

  const leaderboardData = {
    gold: [
      { rank: 1, avatar: '/assets/avatar1.jpg', name: 'Player1', value: 1000000 },
      { rank: 2, avatar: '/assets/avatar2.jpg', name: 'Player2', value: 900000 },
      { rank: 3, avatar: '/assets/avatar3.jpg', name: 'Player3', value: 800000 },
      { rank: 4, avatar: '/assets/avatar4.jpg', name: 'Player4', value: 700000 },
      { rank: 5, avatar: '/assets/avatar5.jpg', name: 'Player5', value: 600000 }
    ],
    wins: [
      { rank: 1, avatar: '/assets/avatar1.jpg', name: 'Player1', value: 1000 },
      { rank: 2, avatar: '/assets/avatar2.jpg', name: 'Player2', value: 900 },
      { rank: 3, avatar: '/assets/avatar3.jpg', name: 'Player3', value: 800 },
      { rank: 4, avatar: '/assets/avatar4.jpg', name: 'Player4', value: 700 },
      { rank: 5, avatar: '/assets/avatar5.jpg', name: 'Player5', value: 600 }
    ],
    level: [
      { rank: 1, avatar: '/assets/avatar1.jpg', name: 'Player1', value: 50 },
      { rank: 2, avatar: '/assets/avatar2.jpg', name: 'Player2', value: 45 },
      { rank: 3, avatar: '/assets/avatar3.jpg', name: 'Player3', value: 40 },
      { rank: 4, avatar: '/assets/avatar4.jpg', name: 'Player4', value: 35 },
      { rank: 5, avatar: '/assets/avatar5.jpg', name: 'Player5', value: 30 }
    ]
  };

  const formatValue = (value, type) => {
    switch (type) {
      case 'gold':
        return value.toLocaleString() + ' 🪙';
      case 'wins':
        return value.toLocaleString() + ' побед';
      case 'level':
        return 'Уровень ' + value;
      default:
        return value;
    }
  };

  return (
    <LeaderboardContainer>
      <Balance {...balance} />
      <LeaderboardCard>
        <TabsContainer>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.name}
            </Tab>
          ))}
        </TabsContainer>

        <Table>
          <thead>
            <tr>
              <TableHeader>#</TableHeader>
              <TableHeader>Игрок</TableHeader>
              <TableHeader>{tabs.find(tab => tab.id === activeTab)?.name}</TableHeader>
            </tr>
          </thead>
          <tbody>
            {leaderboardData[activeTab].map(player => (
              <PlayerRow
                key={player.rank}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RankCell rank={player.rank}>{player.rank}</RankCell>
                <AvatarCell>
                  <Avatar />
                </AvatarCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{formatValue(player.value, activeTab)}</TableCell>
              </PlayerRow>
            ))}
          </tbody>
        </Table>
      </LeaderboardCard>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 