import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 20px 10px 140px 10px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 20px;
  padding-top: max(20px, env(safe-area-inset-top));
  padding-bottom: max(20px, env(safe-area-inset-bottom));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  margin-bottom: 70px;

  @media (orientation: landscape) {
    padding: 15px;
    padding-top: max(15px, env(safe-area-inset-top));
    padding-bottom: max(15px, env(safe-area-inset-bottom));
    margin-bottom: 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const LeaderboardTable = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  border: 2px solid ${props => props.theme.colors.accent};
  overflow: hidden;
  margin-top: 20px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  padding: 15px;
  background: rgba(0, 0, 0, 0.6);
  border-bottom: 2px solid ${props => props.theme.colors.accent};
`;

const TableContent = styled.div`
  height: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  padding: 12px 15px;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const HeaderCell = styled.div`
  color: ${props => props.theme.colors.accent};
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
`;

const Cell = styled.div`
  color: ${props => props.theme.colors.text};
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: url(${props => props.src}) center/cover;
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
  const players = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Player${i + 1}`,
    score: Math.floor(Math.random() * 10000),
    avatar: '/assets/default-avatar.jpg'
  })).sort((a, b) => b.score - a.score);

  return (
    <LeaderboardContainer>
      <ContentWrapper>
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
            <HeaderCell>#</HeaderCell>
            <HeaderCell>Игрок</HeaderCell>
            <HeaderCell>Очки</HeaderCell>
          </TableHeader>
          <TableContent>
            {players.map((player, index) => (
              <TableRow key={player.id}>
                <Cell>{index + 1}</Cell>
                <Cell>
                  <PlayerInfo>
                    <Avatar src={player.avatar} />
                    <PlayerName>{player.name}</PlayerName>
                  </PlayerInfo>
                </Cell>
                <Cell>{player.score}</Cell>
              </TableRow>
            ))}
          </TableContent>
        </LeaderboardTable>
      </ContentWrapper>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 