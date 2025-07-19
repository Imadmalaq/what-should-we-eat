import { SwipeQuestion, FoodRecommendation } from '@/types/app';

// AI-powered dynamic questions that change each time
const questionBank: SwipeQuestion[] = [
  // Mood & Energy
  {
    id: 'energy_1',
    question: 'How\'s your energy tonight?',
    emoji: '⚡',
    optionA: { text: 'Zero effort vibes', emoji: '😴', category: 'easy' },
    optionB: { text: 'Let\'s get cooking!', emoji: '👨‍🍳', category: 'involved' }
  },
  {
    id: 'mood_1',
    question: 'What\'s the vibe?',
    emoji: '💭',
    optionA: { text: 'Cozy & romantic', emoji: '🕯️', category: 'comfort' },
    optionB: { text: 'Fun & adventurous', emoji: '🎉', category: 'exotic' }
  },
  {
    id: 'time_1',
    question: 'How much time do you have?',
    emoji: '⏰',
    optionA: { text: 'Quick bite needed', emoji: '⚡', category: 'fast' },
    optionB: { text: 'We can take our time', emoji: '🍷', category: 'slow' }
  },
  
  // Flavor Profiles
  {
    id: 'spice_1',
    question: 'Spice tolerance tonight?',
    emoji: '🌶️',
    optionA: { text: 'Keep it mild', emoji: '😌', category: 'mild' },
    optionB: { text: 'Bring the heat!', emoji: '🔥', category: 'spicy' }
  },
  {
    id: 'texture_1',
    question: 'What texture sounds good?',
    emoji: '🍽️',
    optionA: { text: 'Creamy & smooth', emoji: '🥛', category: 'creamy' },
    optionB: { text: 'Crunchy & crispy', emoji: '🥖', category: 'crunchy' }
  },
  {
    id: 'temperature_1',
    question: 'Temperature preference?',
    emoji: '🌡️',
    optionA: { text: 'Something hot & warm', emoji: '🔥', category: 'hot' },
    optionB: { text: 'Cool & refreshing', emoji: '❄️', category: 'cold' }
  },
  
  // Budget & Practicality
  {
    id: 'budget_1',
    question: 'What\'s the budget tonight?',
    emoji: '💰',
    optionA: { text: 'Keep it affordable', emoji: '💵', category: 'budget' },
    optionB: { text: 'Let\'s splurge a bit', emoji: '💎', category: 'splurge' }
  },
  {
    id: 'effort_1',
    question: 'Cooking or ordering?',
    emoji: '🤔',
    optionA: { text: 'Order in tonight', emoji: '📱', category: 'delivery' },
    optionB: { text: 'Cook together', emoji: '👫', category: 'cooking' }
  },
  
  // Cuisine & Style
  {
    id: 'cuisine_1',
    question: 'Cuisine adventure level?',
    emoji: '🌍',
    optionA: { text: 'Stick to favorites', emoji: '🍔', category: 'familiar' },
    optionB: { text: 'Try something new', emoji: '🍜', category: 'international' }
  },
  {
    id: 'portion_1',
    question: 'How hungry are you?',
    emoji: '🍽️',
    optionA: { text: 'Light & satisfying', emoji: '🥗', category: 'light' },
    optionB: { text: 'Big & hearty', emoji: '🍖', category: 'heavy' }
  },
  {
    id: 'sharing_1',
    question: 'Sharing or individual?',
    emoji: '👥',
    optionA: { text: 'Share everything', emoji: '💕', category: 'sharing' },
    optionB: { text: 'Our own dishes', emoji: '🍽️', category: 'individual' }
  },
  {
    id: 'healthiness_1',
    question: 'Health conscious tonight?',
    emoji: '🥬',
    optionA: { text: 'Indulge a little', emoji: '🍰', category: 'indulgent' },
    optionB: { text: 'Keep it healthy', emoji: '🥑', category: 'healthy' }
  }
];

export function getRandomQuestions(): SwipeQuestion[] {
  // Shuffle and return 5 random questions
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

export const swipeQuestions = getRandomQuestions();

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