import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import EmotionWheelWindow from './EmotionWheelWindow';
import { GameState } from '../types';
import { emotions } from '../data/emotions';
import Confetti from 'react-confetti';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  padding: 2rem;
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 600px;
`;

const CharacterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 450px;
  border: 10px solid #4CAF50;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoButton = styled(motion.button)<{
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}>`
  position: absolute;
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  transform: ${props => {
    if (props.left === '50%') return 'translateX(-50%)';
    if (props.top === '50%') return 'translateY(-50%)';
    return 'none';
  }};
  white-space: nowrap;
  padding: 10px 20px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    transform: ${props => {
      if (props.left === '50%') return 'translateX(-50%) scale(1.1)';
      if (props.top === '50%') return 'translateY(-50%) scale(1.1)';
      return 'scale(1.1)';
    }};
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }
`;

const InfoPopup = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  z-index: 20;
`;

const IdentifyButton = styled(Button)`
  margin-top: 2rem;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }
`;

const MessageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const MessageBox = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 80%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const MessageTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.color || '#333'};
`;

const MessageText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #666;
`;

const MessageButton = styled(Button)<{ $background?: string }>`
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.$background || 'linear-gradient(45deg, #ff6b6b, #feca57)'};
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

const buttonVariants = {
  idle: { scale: 1 },
  shake: {
    scale: [1, 1.1, 1, 1.1, 1],
    rotate: [0, -5, 0, 5, 0],
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
  }
};

interface GameScreenProps {
  gameState: GameState;
  setGameState: (newState: Partial<GameState>) => void;
  restartGame: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, setGameState, restartGame }) => {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [showEmotionWheel, setShowEmotionWheel] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<any>(null);
  const [showMessage, setShowMessage] = useState<'correct' | 'incorrect' | 'completed' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const levelEmotions = emotions[gameState.currentLevel];
    const randomEmotion = levelEmotions[Math.floor(Math.random() * levelEmotions.length)];
    setCurrentEmotion(randomEmotion);
  }, [gameState.currentLevel]);

  const handleInfoClick = (info: string) => {
    setActiveInfo(activeInfo === info ? null : info);
  };

  const handleEmotionSelect = (emotion: string) => {
    setShowEmotionWheel(false);
    if (emotion === currentEmotion.name) {
      setShowMessage('correct');
      setShowConfetti(true);
    } else {
      setShowMessage('incorrect');
    }
  };

  const handleNextLevel = () => {
    setShowConfetti(false);
    setShowMessage(null);
    if (gameState.currentLevel === 'easy') {
      setGameState({ currentLevel: 'medium' });
    } else if (gameState.currentLevel === 'medium') {
      setGameState({ currentLevel: 'hard' });
    } else if (gameState.currentLevel === 'hard') {
      setShowMessage('completed');
      setShowConfetti(true);
    }
  };

  const handleTryAgain = () => {
    setShowMessage(null);
  };

  const handleRestartGame = () => {
    setShowConfetti(false);
    setShowMessage(null);
    restartGame();
  };

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  return (
    <GameContainer>
      {gameState.selectedCharacter && currentEmotion && (
        <GameArea>
          <CharacterContainer>
            <CharacterImage src={gameState.selectedCharacter.image} alt={gameState.selectedCharacter.name} />
            <AnimatePresence>
              {activeInfo && (
                <InfoPopup
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    top: activeInfo === 'thoughts' ? '20%' : activeInfo === 'behaviors' ? '40%' : '60%',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <h3>{activeInfo}</h3>
                  <p>{getRandomItem(currentEmotion[activeInfo])}</p>
                  <Button onClick={() => setActiveInfo(null)}>Close</Button>
                </InfoPopup>
              )}
            </AnimatePresence>
          </CharacterContainer>
          <InfoButton 
            top="20px"
            left="40%"
            onClick={() => handleInfoClick('thoughts')}
            variants={buttonVariants}
            animate="shake"
          >
            Thoughts
          </InfoButton>
          <InfoButton 
            top="50%"
            left="-15px"
            onClick={() => handleInfoClick('behaviors')}
            variants={buttonVariants}
            animate="shake"
          >
            Behaviors
          </InfoButton>
          <InfoButton 
            top="50%"
            right="-60px"
            onClick={() => handleInfoClick('sensations')}
            variants={buttonVariants}
            animate="shake"
          >
            Body Sensations
          </InfoButton>
        </GameArea>
      )}
      {!activeInfo && (
        <IdentifyButton onClick={() => setShowEmotionWheel(true)}>
          Identify the Emotion
        </IdentifyButton>
      )}
      <AnimatePresence>
        {showEmotionWheel && (
          <EmotionWheelWindow
            onSelect={handleEmotionSelect}
            difficulty={gameState.currentLevel}
            onClose={() => setShowEmotionWheel(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMessage && (
          <MessageOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MessageBox
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {showMessage === 'correct' && (
                <>
                  <MessageTitle color="#4CAF50">Congratulations!</MessageTitle>
                  <MessageText>You identified the correct emotion!</MessageText>
                  <MessageButton $background="linear-gradient(45deg, #4CAF50, #8BC34A)" onClick={handleNextLevel}>
                    Go to Next Level
                  </MessageButton>
                </>
              )}
              {showMessage === 'incorrect' && (
                <>
                  <MessageTitle color="#FF5722">Not Quite Right</MessageTitle>
                  <MessageText>Keep observing and try again!</MessageText>
                  <MessageButton $background="linear-gradient(45deg, #FF5722, #FF9800)" onClick={handleTryAgain}>
                    Try Again
                  </MessageButton>
                </>
              )}
              {showMessage === 'completed' && (
                <>
                  <MessageTitle color="#4CAF50">Congratulations!</MessageTitle>
                  <MessageText>You've completed all levels of Emotion Quest! You're an emotion expert now!</MessageText>
                  <MessageButton $background="linear-gradient(45deg, #4CAF50, #8BC34A)" onClick={handleRestartGame}>
                    Play Again
                  </MessageButton>
                </>
              )}
            </MessageBox>
          </MessageOverlay>
        )}
      </AnimatePresence>
      {showConfetti && <Confetti />}
    </GameContainer>
  );
};

export default GameScreen;