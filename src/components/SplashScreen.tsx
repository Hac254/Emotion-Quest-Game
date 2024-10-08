import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Letter = styled(motion.span)`
  font-size: 4rem;
  font-weight: bold;
`;

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAnimationComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimationComplete, onComplete]);

  const title = "Emotion Quest";

  return (
    <SplashContainer>
      {title.split('').map((char, index) => (
        <Letter
          key={index}
          initial={{ opacity: 0, x: Math.random() * 1000 - 500, y: Math.random() * 1000 - 500 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          onAnimationComplete={() => {
            if (index === title.length - 1) setIsAnimationComplete(true);
          }}
          style={{ color: `hsl(${index * 30}, 70%, 50%)` }}
        >
          {char}
        </Letter>
      ))}
    </SplashContainer>
  );
};

export default SplashScreen;