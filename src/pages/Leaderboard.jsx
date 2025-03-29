import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100%;
  background: url('/assets/leaderboard-bg.jpg') center/cover;
  overflow-y: auto;
`;

const LeaderboardTable = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.accent};
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  padding: 10px;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.primary};
  text-align: left;
  gap: 10px;
  align-items: center;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  gap: 10px;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayerAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: url('/assets/default-avatar.jpg') center/cover;
  border: 2px solid ${props => props.theme.colors.accent};
`;

const PlayerName = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14px;
  justify-content: flex-end;
`;

const CoinIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const Tab = styled.button`
  background: ${props => props.active ? props.theme.colors.accent : 'rgba(0, 0, 0, 0.6)'};
  color: ${props => props.active ? props.theme.colors.black : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 5px;
  padding: 8px 15px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.black};
  }
`;

const Rank = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14px;
  text-align: center;
`;

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('gold');
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player1', score: 1000, avatar: '/assets/default-avatar.jpg' },
    { id: 2, name: 'Player2', score: 800, avatar: '/assets/default-avatar.jpg' },
    { id: 3, name: 'Player3', score: 600, avatar: '/assets/default-avatar.jpg' },
    { id: 4, name: 'Player4', score: 500, avatar: '/assets/default-avatar.jpg' },
    { id: 5, name: 'Player5', score: 400, avatar: '/assets/default-avatar.jpg' },
  ]);

  return (
    <LeaderboardContainer>
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
      
      <LeaderboardTable>
        <TableHeader>
          <div>#</div>
          <div>Игрок</div>
          <div>Значение</div>
        </TableHeader>
        {players.map((player, index) => (
          <TableRow key={player.id}>
            <Rank>{index + 1}</Rank>
            <PlayerInfo>
              <PlayerAvatar style={{ backgroundImage: `url(${player.avatar})` }} />
              <PlayerName>{player.name}</PlayerName>
            </PlayerInfo>
            <Score>
              {player.score}
              <CoinIcon src="/assets/gold-coin.png" alt="Gold" />
            </Score>
          </TableRow>
        ))}
      </LeaderboardTable>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 