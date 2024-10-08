import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
`;

const ContentWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Instructions = styled.div`
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  &:before {
    content: '👉';
    margin-right: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <WelcomeContainer>
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Welcome to Emotion Quest!</Title>
        <Instructions>
          <p>Embark on a journey to master the art of emotional intelligence!</p>
          <h3>How to Play:</h3>
          <List>
            <ListItem>Observe characters and their situations closely</ListItem>
            <ListItem>Analyze thoughts, bodily sensations, and actions</ListItem>
            <ListItem>Use the Emotion Wheel to identify feelings</ListItem>
            <ListItem>Progress through levels of emotional complexity</ListItem>
          </List>
          <p>Become an emotion detective and level up your EQ!</p>
        </Instructions>
        <StyledButton onClick={onStart}>Begin Your Quest</StyledButton>
      </ContentWrapper>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;