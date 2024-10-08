import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const WheelContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 1 / 1;
`;

const EmotionSegment = styled(motion.path)`
  cursor: pointer;
`;

const EmotionText = styled(motion.text)`
  font-size: 16px;
  text-anchor: middle;
  pointer-events: none;
  font-weight: bold;
`;

const emotionData = {
  easy: [
    { name: 'Happy', color: '#FF0000' },
    { name: 'Sad', color: '#0000FF' },
    { name: 'Mad', color: '#00FF00' },
    { name: 'Scared', color: '#FFA500' },
  ],
  medium: [
    { name: 'Happy', color: '#FF0000', subEmotions: ['Excited', 'Cheerful'] },
    { name: 'Sad', color: '#0000FF', subEmotions: ['Lonely', 'Hurt'] },
    { name: 'Mad', color: '#00FF00', subEmotions: ['Angry', 'Frustrated'] },
    { name: 'Scared', color: '#FFA500', subEmotions: ['Anxious', 'Helpless'] },
  ],
  hard: [
    { name: 'Happy', color: '#FF0000', subEmotions: ['Excited', 'Cheerful'], tertiaryEmotions: ['Joyful', 'Proud'] },
    { name: 'Sad', color: '#0000FF', subEmotions: ['Lonely', 'Hurt'], tertiaryEmotions: ['Depressed', 'Guilty'] },
    { name: 'Mad', color: '#00FF00', subEmotions: ['Angry', 'Frustrated'], tertiaryEmotions: ['Furious', 'Jealous'] },
    { name: 'Scared', color: '#FFA500', subEmotions: ['Anxious', 'Helpless'], tertiaryEmotions: ['Terrified', 'Insecure'] },
  ],
};

interface EmotionWheelProps {
  onSelect: (emotion: string) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const EmotionWheel: React.FC<EmotionWheelProps> = ({ onSelect, difficulty }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRolling(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    onSelect(emotion);
  };

  const renderWheel = () => {
    const emotions = emotionData[difficulty];
    const totalEmotions = emotions.length;
    const centerX = 0;
    const centerY = 0;
    const radius = difficulty === 'easy' ? 150 : 80; // Increased radius for easy level

    return (
      <g>
        {emotions.map((emotion, index) => {
          const startAngle = (index / totalEmotions) * 2 * Math.PI - Math.PI / 2;
          const endAngle = ((index + 1) / totalEmotions) * 2 * Math.PI - Math.PI / 2;
          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);

          const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

          const textX = centerX + (radius * 0.7) * Math.cos((startAngle + endAngle) / 2);
          const textY = centerY + (radius * 0.7) * Math.sin((startAngle + endAngle) / 2);

          return (
            <g key={emotion.name}>
              <EmotionSegment
                d={pathData}
                fill={emotion.color}
                onClick={() => handleSelect(emotion.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <EmotionText
                x={textX}
                y={textY}
                fill="white"
                style={{ fontSize: difficulty === 'easy' ? '24px' : '14px' }} // Increased font size for easy level
              >
                {emotion.name}
              </EmotionText>
              {difficulty !== 'easy' && renderSubEmotions(emotion, index, totalEmotions)}
              {difficulty === 'hard' && renderTertiaryEmotions(emotion, index, totalEmotions)}
            </g>
          );
        })}
      </g>
    );
  };

  const renderSubEmotions = (emotion: any, index: number, totalEmotions: number) => {
    const subEmotions = emotion.subEmotions;
    const startAngle = (index / totalEmotions) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / totalEmotions) * 2 * Math.PI - Math.PI / 2;
    const innerRadius = 80;
    const outerRadius = 120;

    return subEmotions.map((subEmotion: string, subIndex: number) => {
      const subStartAngle = startAngle + (subIndex / subEmotions.length) * (endAngle - startAngle);
      const subEndAngle = startAngle + ((subIndex + 1) / subEmotions.length) * (endAngle - startAngle);
      const x1 = innerRadius * Math.cos(subStartAngle);
      const y1 = innerRadius * Math.sin(subStartAngle);
      const x2 = outerRadius * Math.cos(subStartAngle);
      const y2 = outerRadius * Math.sin(subStartAngle);
      const x3 = outerRadius * Math.cos(subEndAngle);
      const y3 = outerRadius * Math.sin(subEndAngle);
      const x4 = innerRadius * Math.cos(subEndAngle);
      const y4 = innerRadius * Math.sin(subEndAngle);

      const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;

      const textX = (innerRadius + outerRadius) / 2 * Math.cos((subStartAngle + subEndAngle) / 2);
      const textY = (innerRadius + outerRadius) / 2 * Math.sin((subStartAngle + subEndAngle) / 2);

      return (
        <g key={subEmotion}>
          <EmotionSegment
            d={pathData}
            fill={emotion.color}
            opacity={0.7}
            onClick={() => handleSelect(subEmotion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <EmotionText
            x={textX}
            y={textY}
            fill="white"
            style={{ fontSize: '12px' }}
          >
            {subEmotion}
          </EmotionText>
        </g>
      );
    });
  };

  const renderTertiaryEmotions = (emotion: any, index: number, totalEmotions: number) => {
    const tertiaryEmotions = emotion.tertiaryEmotions;
    const startAngle = (index / totalEmotions) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / totalEmotions) * 2 * Math.PI - Math.PI / 2;
    const innerRadius = 120;
    const outerRadius = 160;

    return tertiaryEmotions.map((tertiaryEmotion: string, tertiaryIndex: number) => {
      const tertiaryStartAngle = startAngle + (tertiaryIndex / tertiaryEmotions.length) * (endAngle - startAngle);
      const tertiaryEndAngle = startAngle + ((tertiaryIndex + 1) / tertiaryEmotions.length) * (endAngle - startAngle);
      const x1 = innerRadius * Math.cos(tertiaryStartAngle);
      const y1 = innerRadius * Math.sin(tertiaryStartAngle);
      const x2 = outerRadius * Math.cos(tertiaryStartAngle);
      const y2 = outerRadius * Math.sin(tertiaryStartAngle);
      const x3 = outerRadius * Math.cos(tertiaryEndAngle);
      const y3 = outerRadius * Math.sin(tertiaryEndAngle);
      const x4 = innerRadius * Math.cos(tertiaryEndAngle);
      const y4 = innerRadius * Math.sin(tertiaryEndAngle);

      const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;

      const textX = (innerRadius + outerRadius) / 2 * Math.cos((tertiaryStartAngle + tertiaryEndAngle) / 2);
      const textY = (innerRadius + outerRadius) / 2 * Math.sin((tertiaryStartAngle + tertiaryEndAngle) / 2);

      return (
        <g key={tertiaryEmotion}>
          <EmotionSegment
            d={pathData}
            fill={emotion.color}
            opacity={0.5}
            onClick={() => handleSelect(tertiaryEmotion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <EmotionText
            x={textX}
            y={textY}
            fill="white"
            style={{ fontSize: '10px' }}
          >
            {tertiaryEmotion}
          </EmotionText>
        </g>
      );
    });
  };

  return (
    <WheelContainer>
      <motion.svg 
        viewBox="-180 -180 360 360"
        animate={{ rotate: isRolling ? 360 : 0 }}
        transition={{ duration: 3, ease: "linear" }}
      >
        {renderWheel()}
      </motion.svg>
    </WheelContainer>
  );
};

export default EmotionWheel;