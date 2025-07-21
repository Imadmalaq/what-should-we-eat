import { QuizQuestion, QuizResult } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'mood',
    question: 'How are you feeling right now?',
    emoji: '😊',
    options: [
      {
        id: 'tired',
        text: 'Tired & need comfort',
        emoji: '😴',
        score: { comfort: 3, quick: 2, healthy: 1 }
      },
      {
        id: 'energetic',
        text: 'Energetic & adventurous',
        emoji: '⚡',
        score: { international: 3, fancy: 2, healthy: 2 }
      },
      {
        id: 'stressed',
        text: 'Stressed & need something easy',
        emoji: '😅',
        score: { quick: 3, comfort: 2, sweet: 1 }
      },
      {
        id: 'celebratory',
        text: 'Happy & want to treat myself',
        emoji: '🎉',
        score: { fancy: 3, sweet: 2, international: 1 }
      }
    ]
  },
  {
    id: 'time',
    question: 'How much time do you have?',
    emoji: '⏰',
    options: [
      {
        id: 'rush',
        text: '10 minutes or less',
        emoji: '🏃‍♀️',
        score: { quick: 3, comfort: 1 }
      },
      {
        id: 'moderate',
        text: '30 minutes',
        emoji: '⏱️',
        score: { healthy: 2, comfort: 2, international: 1 }
      },
      {
        id: 'plenty',
        text: '1+ hours (let\'s cook!)',
        emoji: '👨‍🍳',
        score: { fancy: 3, healthy: 2, international: 2 }
      }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your budget like?',
    emoji: '💰',
    options: [
      {
        id: 'tight',
        text: 'Keep it cheap',
        emoji: '🪙',
        score: { quick: 2, comfort: 2, healthy: 1 }
      },
      {
        id: 'moderate',
        text: 'Average spending',
        emoji: '💵',
        score: { healthy: 2, international: 2, comfort: 1 }
      },
      {
        id: 'splurge',
        text: 'Treat myself today',
        emoji: '💎',
        score: { fancy: 3, international: 2, sweet: 1 }
      }
    ]
  },
  {
    id: 'craving',
    question: 'What sounds good right now?',
    emoji: '🤤',
    options: [
      {
        id: 'savory',
        text: 'Something savory & satisfying',
        emoji: '🧂',
        score: { comfort: 2, international: 2, quick: 1 }
      },
      {
        id: 'fresh',
        text: 'Fresh & light',
        emoji: '🥗',
        score: { healthy: 3, quick: 1 }
      },
      {
        id: 'rich',
        text: 'Rich & indulgent',
        emoji: '🧈',
        score: { fancy: 3, comfort: 2 }
      },
      {
        id: 'sweet',
        text: 'Something sweet',
        emoji: '🍰',
        score: { sweet: 3, comfort: 1 }
      }
    ]
  },
  {
    id: 'cuisine',
    question: 'Any cuisine calling to you?',
    emoji: '🌍',
    options: [
      {
        id: 'american',
        text: 'Classic American',
        emoji: '🍔',
        score: { comfort: 2, quick: 2 }
      },
      {
        id: 'asian',
        text: 'Asian flavors',
        emoji: '🍜',
        score: { international: 3, healthy: 1 }
      },
      {
        id: 'mediterranean',
        text: 'Mediterranean',
        emoji: '🫒',
        score: { healthy: 3, fancy: 1 }
      },
      {
        id: 'anything',
        text: 'Surprise me!',
        emoji: '🎲',
        score: { international: 1, fancy: 1, comfort: 1, healthy: 1, quick: 1, sweet: 1 }
      }
    ]
  }
];

export const quizResults: { [key: string]: QuizResult } = {
  comfort: {
    type: 'comfort',
    title: 'Comfort Food Time! 🫂',
    description: 'You need something warm, familiar, and soul-satisfying right now.',
    emoji: '🍝',
    suggestions: [
      'Mac and cheese with crispy breadcrumbs',
      'A hearty grilled cheese and tomato soup',
      'Chicken noodle soup',
      'Homemade pasta with butter and parmesan',
      'Pizza (delivery or homemade)',
      'Warm chocolate chip cookies'
    ]
  },
  healthy: {
    type: 'healthy',
    title: 'Fresh & Nutritious! 🌱',
    description: 'Your body is craving something light, fresh, and energizing.',
    emoji: '🥗',
    suggestions: [
      'Rainbow veggie bowl with quinoa',
      'Grilled salmon with roasted vegetables',
      'Fresh caprese salad with avocado',
      'Green smoothie bowl with berries',
      'Asian lettuce wraps',
      'Mediterranean chickpea salad'
    ]
  },
  quick: {
    type: 'quick',
    title: 'Quick & Easy Wins! ⚡',
    description: 'You need something delicious that won\'t take forever to make.',
    emoji: '🥪',
    suggestions: [
      'Avocado toast with everything seasoning',
      'Quesadillas with whatever you have',
      'Instant ramen (but make it fancy)',
      'Peanut butter and banana sandwich',
      'Scrambled eggs with toast',
      'Pre-made salad from the store'
    ]
  },
  fancy: {
    type: 'fancy',
    title: 'Something Special! ✨',
    description: 'Time to treat yourself to something a little more elevated.',
    emoji: '🥩',
    suggestions: [
      'Pan-seared steak with herb butter',
      'Homemade risotto',
      'Fresh pasta with truffle oil',
      'Seared scallops with garlic',
      'Duck confit (if you\'re feeling ambitious)',
      'Gourmet burger with all the fixings'
    ]
  },
  international: {
    type: 'international',
    title: 'Global Adventure! 🌍',
    description: 'Your taste buds are ready for a culinary journey around the world.',
    emoji: '🍛',
    suggestions: [
      'Thai curry with jasmine rice',
      'Authentic tacos with fresh salsa',
      'Japanese ramen from scratch',
      'Indian butter chicken',
      'Korean bibimbap',
      'Moroccan tagine'
    ]
  },
  sweet: {
    type: 'sweet',
    title: 'Sweet Tooth Alert! 🍰',
    description: 'Life\'s too short - you deserve something sweet and delightful.',
    emoji: '🧁',
    suggestions: [
      'Warm brownies with ice cream',
      'Fresh fruit parfait with yogurt',
      'Pancakes with maple syrup',
      'Homemade cookies',
      'Chocolate covered strawberries',
      'Classic banana split'
    ]
  }
};

export function calculateQuizResult(answers: { [key: string]: string }): QuizResult {
  const scores: { [key: string]: number } = {
    comfort: 0,
    healthy: 0,
    quick: 0,
    fancy: 0,
    international: 0,
    sweet: 0
  };

  // Calculate scores based on answers
  quizQuestions.forEach(question => {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId) {
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      if (selectedOption) {
        Object.entries(selectedOption.score).forEach(([category, points]) => {
          scores[category] = (scores[category] || 0) + points;
        });
      }
    }
  });

  // Find the category with the highest score
  const maxCategory = Object.entries(scores).reduce((a, b) => 
    scores[a[0]] > scores[b[0]] ? a : b
  )[0];

  return quizResults[maxCategory];
}