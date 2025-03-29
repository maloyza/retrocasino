import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  padding-bottom: 70px;

  @media (orientation: landscape) {
    padding-bottom: 60px;
  }
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
  max-width: 1200px;
  gap: 20px;
  padding: 20px;
  padding-top: max(20px, env(safe-area-inset-top));

  @media (orientation: landscape) {
    gap: 15px;
    padding: 15px;
    padding-top: max(15px, env(safe-area-inset-top));
  }
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
      </ContentWrapper>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 