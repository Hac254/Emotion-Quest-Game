import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Character } from '../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CharacterSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  font-family: 'Bangers', cursive;
  letter-spacing: 2px;
  animation: bounce 1s ease infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const CharactersGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-bottom: 4rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CharacterCard = styled(motion.div)<{ isSelected: boolean }>`
  cursor: pointer;
  perspective: 1000px;
  width: 300px;
  height: 450px;
  border: ${props => props.isSelected ? '10px solid #4CAF50' : '10px solid transparent'};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
`;

const CharacterInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const CharacterFront = styled(CardSide)`
  background-color: white;
`;

const CharacterBack = styled(CardSide)`
  background-color: #e0e0e0;
  transform: rotateY(180deg);
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MiniCharacterImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  border: 3px solid #4CAF50;
`;

const CharacterName = styled.h3`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 15px;
`;

const CharacterDescription = styled.div`
  font-size: 1rem;
  color: #333;
  text-align: right;
  margin-top: 0.5rem;
`;

const DescriptionHeading = styled.h4`
  text-decoration: underline;
  margin-bottom: 0.5rem;
`;

const PlayButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0,0,0,0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const characters: Character[] = [
  { id: 1, name: 'Emma', image: '/emma.png', description: 'Emma is an empathetic and intuitive character who loves to help others.' },
  { id: 2, name: 'Alex', image: '/alex.png', description: 'Alex is a logical and analytical character who loves sports and solving puzzles.' },
];

interface CharacterSelectionProps {
  onSelect: (character: Character) => void;
}

export default function Component({ onSelect }: CharacterSelectionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character.id);
    setIsFlipping(true);
    let flips = 0;
    const flipInterval = setInterval(() => {
      flips++;
      if (flips >= 4) {
        clearInterval(flipInterval);
        setIsFlipping(false);
      }
    }, 150);
  };

  const handlePlay = () => {
    if (selectedCharacter) {
      const selected = characters.find(c => c.id === selectedCharacter);
      if (selected) {
        onSelect(selected);
      }
    } else {
      toast.info("🎭 Please select a character before starting the game!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <CharacterSelectionContainer>
      <Title>Choose Your Emotion Explorer!</Title>
      <CharactersGrid>
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            isSelected={selectedCharacter === character.id}
            onClick={() => handleSelect(character)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CharacterInner
              animate={{ 
                rotateY: selectedCharacter === character.id 
                  ? isFlipping 
                    ? [0, 180, 0, 180, 0, 180, 0, 180] 
                    : 180 
                  : 0 
              }}
              transition={{ 
                duration: isFlipping ? 0.6 : 0.3,
                times: isFlipping ? [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] : undefined
              }}
            >
              <CharacterFront>
                <CharacterImage src={character.image} alt={character.name} />
                <CharacterName>{character.name}</CharacterName>
              </CharacterFront>
              <CharacterBack>
                
                <MiniCharacterImage src={character.image} alt={character.name} />
                <CharacterDescription>
                  <DescriptionHeading>Character Description</DescriptionHeading>
                  <p>{character.description}</p>
                </CharacterDescription>
              </CharacterBack>
            </CharacterInner>
          </CharacterCard>
        ))}
      </CharactersGrid>
      <PlayButton onClick={handlePlay} disabled={!selectedCharacter}>
        Play the Game
      </PlayButton>
      <ToastContainer />
    </CharacterSelectionContainer>
  );
}