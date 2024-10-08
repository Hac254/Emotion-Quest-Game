import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import CharacterSelection from './components/CharacterSelection';
import GameScreen from './components/GameScreen';
import { GameState, Character } from './types';

const initialGameState: GameState = {
  currentScreen: 'splash',
  selectedCharacter: null,
  currentLevel: 'easy',
  score: 0,
};

function AppContent() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const navigate = useNavigate();

  const navigateToScreen = (screen: string) => {
    setGameState((prevState) => ({ ...prevState, currentScreen: screen }));
    navigate(`/${screen}`);
  };

  const handleCharacterSelect = (character: Character) => {
    setGameState((prevState) => ({
      ...prevState,
      selectedCharacter: character,
      currentScreen: 'game',
    }));
    navigate('/game');
  };

  const handleGameStateUpdate = (newState: Partial<GameState>) => {
    setGameState((prevState) => ({ ...prevState, ...newState }));
  };

  const restartGame = () => {
    setGameState(initialGameState);
    navigate('/welcome');
  };

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route 
          path="/" 
          element={
            <SplashScreen 
              onComplete={() => navigateToScreen('welcome')} 
            />
          } 
        />
        <Route 
          path="/welcome" 
          element={
            <WelcomeScreen 
              onStart={() => navigateToScreen('character-select')} 
            />
          } 
        />
        <Route
          path="/character-select"
          element={
            <CharacterSelection
              onSelect={handleCharacterSelect}
            />
          }
        />
        <Route
          path="/game"
          element={
            gameState.selectedCharacter ? (
              <GameScreen
                gameState={gameState}
                setGameState={handleGameStateUpdate}
                restartGame={restartGame}
              />
            ) : (
              <Navigate to="/character-select" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}