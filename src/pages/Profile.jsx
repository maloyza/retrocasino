import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Balance from '../components/Balance';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height: 100%;
  background: url('/assets/profile-bg.jpg') center/cover;

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 10px;
    gap: 10px;
  }
`;

const ProfileCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border: 2px solid ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;

  @media (orientation: landscape) and (max-height: 600px) {
    flex-direction: row;
    gap: 20px;
    padding: 15px;
    align-items: flex-start;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (orientation: landscape) and (max-height: 600px) {
    width: 200px;
    flex-shrink: 0;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  @media (orientation: landscape) and (max-height: 600px) {
    margin-bottom: 5px;
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: url('/assets/default-avatar.jpg') center/cover;
  border: 3px solid ${props => props.theme.colors.accent};
  position: relative;

  @media (orientation: landscape) and (max-height: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const ChangeAvatarButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Nickname = styled.input`
  background: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  padding: 8px 16px;
  border-radius: 5px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 16px;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
`;

const ChangeNicknameButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (orientation: landscape) and (max-height: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.accent};
`;

const StatTitle = styled.div`
  color: ${props => props.theme.colors.accent};
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;

  @media (orientation: landscape) and (max-height: 600px) {
    font-size: 1rem;
  }
`;

const LevelProgress = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.accent};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 15px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;
  border: 1px solid ${props => props.theme.colors.accent};
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: ${props => props.theme.colors.accent};
  transition: width 0.3s ease;
`;

const ReferralSection = styled.div`
  background: ${props => props.theme.colors.primary};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
`;

const ReferralCode = styled.div`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.accent};
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 18px;
`;

const CopyButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.black};
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
`;

const Profile = () => {
  const [nickname, setNickname] = useState('Player123');
  const [balance, setBalance] = useState({
    blueCoins: 1000,
    greenCoins: 1000,
    redCoins: 1000,
    goldCoins: 100
  });

  const stats = {
    level: 5,
    xp: 750,
    nextLevelXp: 1000,
    gamesPlayed: 42,
    totalWins: 28,
    winRate: '67%',
    referralCount: 3
  };

  const handleChangeNickname = () => {
    // Здесь будет логика изменения никнейма
    console.log('Changing nickname to:', nickname);
  };

  const handleCopyReferralCode = () => {
    // Здесь будет логика копирования реферального кода
    console.log('Copying referral code');
  };

  return (
    <ProfileContainer>
      <Balance {...balance} />
      <ProfileCard>
        <LeftSection>
          <AvatarContainer>
            <Avatar />
            <ChangeAvatarButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Сменить аватар
            </ChangeAvatarButton>
          </AvatarContainer>
          <NicknameContainer>
            <Nickname
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Введите никнейм"
            />
            <ChangeNicknameButton
              onClick={handleChangeNickname}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Изменить
            </ChangeNicknameButton>
          </NicknameContainer>
          <LevelProgress>
            <StatTitle>Уровень {stats.level}</StatTitle>
            <ProgressBar>
              <Progress progress={(stats.xp / stats.nextLevelXp) * 100} />
            </ProgressBar>
            <StatTitle style={{ marginTop: '5px' }}>
              {stats.xp}/{stats.nextLevelXp} XP
            </StatTitle>
          </LevelProgress>
        </LeftSection>
        <RightSection>
          <StatsContainer>
            <StatCard>
              <StatTitle>Игр сыграно</StatTitle>
              <StatValue>{stats.gamesPlayed}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Побед</StatTitle>
              <StatValue>{stats.totalWins}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Винрейт</StatTitle>
              <StatValue>{stats.winRate}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Рефералов</StatTitle>
              <StatValue>{stats.referralCount}</StatValue>
            </StatCard>
          </StatsContainer>
          <ReferralSection>
            <StatTitle>Реферальная программа</StatTitle>
            <div style={{ color: props => props.theme.colors.text, fontSize: '14px' }}>
              Приглашено друзей: {stats.referralCount}
            </div>
            <ReferralCode>REF123456</ReferralCode>
            <CopyButton
              onClick={handleCopyReferralCode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Скопировать код
            </CopyButton>
          </ReferralSection>
        </RightSection>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile; 