export interface Character {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface GameState {
  currentScreen: string;
  selectedCharacter: Character | null;
  currentLevel: 'easy' | 'medium' | 'hard';
  score: number;
}