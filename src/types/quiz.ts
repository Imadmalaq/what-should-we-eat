export interface QuizQuestion {
  id: string;
  question: string;
  emoji: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  score: {
    [key: string]: number;
  };
}

export interface QuizResult {
  type: string;
  title: string;
  description: string;
  emoji: string;
  suggestions: string[];
}

export interface QuizAnswers {
  [questionId: string]: string;
}

export const FOOD_CATEGORIES = {
  comfort: 'Comfort Food',
  healthy: 'Healthy',
  quick: 'Quick & Easy',
  fancy: 'Something Special',
  international: 'International',
  sweet: 'Something Sweet'
} as const;

export type FoodCategory = keyof typeof FOOD_CATEGORIES;