interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'mood',
    question: "What's your current mood?",
    options: [
      { id: 'adventurous', text: 'Adventurous - try something new!' },
      { id: 'comfort', text: 'Comfort - stick to familiar favorites' },
      { id: 'healthy', text: 'Health-conscious - light and nutritious' },
      { id: 'indulgent', text: 'Indulgent - treat yourself!' }
    ]
  },
  {
    id: 'budget',
    question: "What's your budget like?",
    options: [
      { id: 'budget', text: '$$ - Keep it affordable' },
      { id: 'moderate', text: '$$$ - Willing to splurge a bit' },
      { id: 'premium', text: '$$$$ - Money is no object' },
      { id: 'free', text: '$ - As cheap as possible' }
    ]
  },
  {
    id: 'time',
    question: "How much time do you have?",
    options: [
      { id: 'quick', text: '15 minutes - Something quick!' },
      { id: 'moderate', text: '30-45 minutes - Normal meal time' },
      { id: 'leisurely', text: '1+ hours - Take my time' },
      { id: 'flexible', text: "I'm flexible with timing" }
    ]
  },
  {
    id: 'cuisine',
    question: "Any cuisine preferences?",
    options: [
      { id: 'asian', text: 'Asian - Chinese, Japanese, Thai, etc.' },
      { id: 'western', text: 'Western - American, Italian, Mexican' },
      { id: 'local', text: 'Local specialties' },
      { id: 'fusion', text: 'Fusion - Mix of different styles' }
    ]
  }
];

export const defaultQuizAnswers = {
  mood: '',
  budget: '',
  time: '',
  cuisine: ''
};