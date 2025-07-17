import { SwipeQuestion, FoodRecommendation } from '@/types/app';

export const swipeQuestions: SwipeQuestion[] = [
  {
    id: 'mood',
    question: 'How are you both feeling?',
    emoji: '💕',
    optionA: {
      text: 'Cozy night in',
      emoji: '🏠',
      category: 'comfort'
    },
    optionB: {
      text: 'Adventure time',
      emoji: '✨',
      category: 'exotic'
    }
  },
  {
    id: 'energy',
    question: 'Energy level check',
    emoji: '⚡',
    optionA: {
      text: 'Tired & lazy',
      emoji: '😴',
      category: 'easy'
    },
    optionB: {
      text: 'Ready to cook',
      emoji: '👨‍🍳',
      category: 'involved'
    }
  },
  {
    id: 'budget',
    question: 'Tonight\'s budget vibe',
    emoji: '💰',
    optionA: {
      text: 'Keep it simple',
      emoji: '🪙',
      category: 'budget'
    },
    optionB: {
      text: 'Treat ourselves',
      emoji: '💎',
      category: 'splurge'
    }
  },
  {
    id: 'flavor',
    question: 'Flavor preference',
    emoji: '👅',
    optionA: {
      text: 'Rich & hearty',
      emoji: '🧈',
      category: 'heavy'
    },
    optionB: {
      text: 'Fresh & light',
      emoji: '🥗',
      category: 'light'
    }
  },
  {
    id: 'cuisine',
    question: 'Cuisine style',
    emoji: '🌍',
    optionA: {
      text: 'Familiar favorites',
      emoji: '🍔',
      category: 'familiar'
    },
    optionB: {
      text: 'Something new',
      emoji: '🍜',
      category: 'international'
    }
  }
];

export const foodRecommendations: { [key: string]: FoodRecommendation } = {
  pasta: {
    category: 'pasta',
    title: 'Cozy Pasta Night! 🍝',
    description: 'Perfect for a romantic evening in with something warm and comforting.',
    emoji: '🍝',
    restaurants: []
  },
  sushi: {
    category: 'sushi',
    title: 'Fresh Sushi Date! 🍣',
    description: 'Light, fresh, and perfect for sharing together.',
    emoji: '🍣',
    restaurants: []
  },
  pizza: {
    category: 'pizza',
    title: 'Pizza & Chill! 🍕',
    description: 'Easy, delicious, and always a crowd pleaser.',
    emoji: '🍕',
    restaurants: []
  },
  tacos: {
    category: 'tacos',
    title: 'Taco Tuesday! 🌮',
    description: 'Fun, flavorful, and perfect for a casual date night.',
    emoji: '🌮',
    restaurants: []
  },
  ramen: {
    category: 'ramen',
    title: 'Cozy Ramen Night! 🍜',
    description: 'Warm, comforting, and soul-satisfying.',
    emoji: '🍜',
    restaurants: []
  },
  burgers: {
    category: 'burgers',
    title: 'Burger Date! 🍔',
    description: 'Classic, satisfying, and always hits the spot.',
    emoji: '🍔',
    restaurants: []
  }
};

export function calculateFoodRecommendation(answers: { [key: string]: string }): FoodRecommendation {
  // Simple scoring based on swipe choices
  const categories = Object.values(answers);
  
  // Count category preferences
  const scores: { [key: string]: number } = {};
  categories.forEach(category => {
    scores[category] = (scores[category] || 0) + 1;
  });
  
  // Map combinations to food recommendations
  if (scores.comfort >= 2 && scores.easy >= 1) {
    return foodRecommendations.pasta;
  } else if (scores.light >= 2 || scores.international >= 1) {
    return foodRecommendations.sushi;
  } else if (scores.easy >= 2 && scores.budget >= 1) {
    return foodRecommendations.pizza;
  } else if (scores.international >= 1 && scores.light >= 1) {
    return foodRecommendations.tacos;
  } else if (scores.involved >= 1 && scores.international >= 1) {
    return foodRecommendations.ramen;
  } else {
    return foodRecommendations.burgers;
  }
}