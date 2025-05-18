import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 130px);
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 8px 2px;
    min-height: unset;
  }
`;

const ProfileCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    padding: 12px 4px;
    border-radius: 7px;
    margin-bottom: 16px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    margin-bottom: 16px;
  }
`;

const AvatarButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.background};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 15px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.background};
  margin-bottom: 15px;
  @media (max-width: 600px) {
    width: 70px;
    height: 70px;
    font-size: 1.7rem;
    margin-bottom: 8px;
  }
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${props => props.theme.colors.accent};
    border-radius: 5px;
    padding: 8px 15px;
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
    @media (max-width: 600px) {
      font-size: 0.85rem;
      padding: 5px 8px;
    }
  }
  button {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover { transform: scale(1.05); }
    @media (max-width: 600px) {
      font-size: 0.8rem;
      padding: 5px 8px;
    }
  }
  @media (max-width: 600px) {
    gap: 5px;
    margin-bottom: 10px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  h4 {
    color: ${props => props.theme.colors.accent};
    font-size: 0.9rem;
    margin-bottom: 5px;
    @media (max-width: 600px) {
      font-size: 0.8rem;
      margin-bottom: 2px;
    }
  }
  p {
    font-size: 1.2rem;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const ReferralSection = styled.div`
  text-align: center;
  margin-top: 30px;
  h3 {
    color: ${props => props.theme.colors.accent};
    font-size: 1rem;
    margin-bottom: 15px;
    @media (max-width: 600px) {
      font-size: 0.85rem;
      margin-bottom: 8px;
    }
  }
  .code {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${props => props.theme.colors.accent};
    border-radius: 5px;
    padding: 10px;
    font-family: monospace;
    font-size: 1.1rem;
    margin-bottom: 15px;
    @media (max-width: 600px) {
      font-size: 0.9rem;
      padding: 6px;
      margin-bottom: 8px;
    }
  }
  button {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover { transform: scale(1.05); }
    @media (max-width: 600px) {
      font-size: 0.8rem;
      padding: 6px 10px;
    }
  }
  @media (max-width: 600px) {
    margin-top: 16px;
  }
`;

const Profile = () => {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ProfileCard>
        <AvatarSection>
          <Avatar>👤</Avatar>
          <AvatarButton>Сменить аватар</AvatarButton>
        </AvatarSection>

        <Username>
          <input type="text" value="Player123" readOnly />
          <button>Изменить</button>
        </Username>

        <StatsGrid>
          <StatItem>
            <h4>Игр сыграно</h4>
            <p>42</p>
          </StatItem>
          <StatItem>
            <h4>Побед</h4>
            <p>28</p>
          </StatItem>
          <StatItem>
            <h4>Винрейт</h4>
            <p>67%</p>
          </StatItem>
          <StatItem>
            <h4>Рефералов</h4>
            <p>3</p>
          </StatItem>
        </StatsGrid>

        <ReferralSection>
          <h3>Реферальная программа</h3>
          <div className="code">REF123456</div>
          <button>Скопировать код</button>
        </ReferralSection>
      </ProfileCard>
    </Container>
  );
};

export default Profile; 