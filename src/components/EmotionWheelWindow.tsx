import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import EmotionWheel from './EmotionWheel';
import { Button } from './ui/button';

const WindowOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const WindowContent = styled(motion.div)<{ $difficulty: string }>`
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${props => props.$difficulty === 'easy' ? '90vw' : '80vw'};
  max-height: 90vh;
  width: ${props => props.$difficulty === 'easy' ? '600px' : '800px'};
  overflow-y: auto;
`;

const BackButton = styled(Button)`
  margin-top: 1rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const InstructionText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

interface EmotionWheelWindowProps {
  onSelect: (emotion: string) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onClose: () => void;
}

const EmotionWheelWindow: React.FC<EmotionWheelWindowProps> = ({ onSelect, difficulty, onClose }) => {
  return (
    <WindowOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <WindowContent
        $difficulty={difficulty}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {difficulty !== 'easy' && (
          <InstructionText>
            Choose the main emotion (Outermost Ring) that best describes how the character feels.
            Ignore the general emotions for now.
          </InstructionText>
        )}
        <EmotionWheel onSelect={onSelect} difficulty={difficulty} />
        <BackButton onClick={onClose}>Back to Game</BackButton>
      </WindowContent>
    
    </WindowOverlay>
  );
};

export default EmotionWheelWindow;