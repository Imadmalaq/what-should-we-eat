import { SwipeQuestion } from '@/types/app';
import { MealType } from '@/components/MealTypeSelector';

export interface QuestionBankItem extends SwipeQuestion {
  id: string;
  mealTypes: MealType[];
  priority: number; // 1 = high priority (early questions), 3 = low priority (later questions)
}

export const questionBank: QuestionBankItem[] = [
  // High priority questions (asked early for all meal types)
  {
    id: 'mood',
    question: "What's your current mood?",
    emoji: "😊",
    optionA: { text: "Relaxed and cozy", emoji: "😌", category: "comfort" },
    optionB: { text: "Energetic and adventurous", emoji: "⚡", category: "adventurous" },
    mealTypes: ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'],
    priority: 1
  },
  {
    id: 'budget',
    question: "What's your budget looking like?",
    emoji: "💰",
    optionA: { text: "Keep it affordable", emoji: "🪙", category: "budget" },
    optionB: { text: "Treat myself today", emoji: "💎", category: "splurge" },
    mealTypes: ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'],
    priority: 1
  },
  {
    id: 'distance',
    question: "How far are you willing to go?",
    emoji: "📍",
    optionA: { text: "Walking distance", emoji: "🚶", category: "walking" },
    optionB: { text: "Worth a drive", emoji: "🚗", category: "driving" },
    mealTypes: ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'],
    priority: 2
  },

  // Full meal specific questions
  {
    id: 'spice_level',
    question: "How do you like your heat?",
    emoji: "🌶️",
    optionA: { text: "Mild and gentle", emoji: "😊", category: "mild" },
    optionB: { text: "Spicy and bold", emoji: "🔥", category: "spicy" },
    mealTypes: ['full-meal'],
    priority: 2
  },
  {
    id: 'protein',
    question: "What's your protein preference?",
    emoji: "🥩",
    optionA: { text: "Meat or seafood", emoji: "🐟", category: "meat" },
    optionB: { text: "Plant-based", emoji: "🌱", category: "vegetarian" },
    mealTypes: ['full-meal', 'breakfast'],
    priority: 2
  },
  {
    id: 'cuisine_style',
    question: "What cuisine sounds appealing?",
    emoji: "🌍",
    optionA: { text: "Local and familiar", emoji: "🏠", category: "local" },
    optionB: { text: "International flavors", emoji: "✈️", category: "international" },
    mealTypes: ['full-meal'],
    priority: 2
  },

  // Breakfast specific
  {
    id: 'breakfast_style',
    question: "How do you want to start your day?",
    emoji: "🌅",
    optionA: { text: "Light and healthy", emoji: "🥗", category: "healthy" },
    optionB: { text: "Hearty and filling", emoji: "🥞", category: "hearty" },
    mealTypes: ['breakfast'],
    priority: 1
  },
  {
    id: 'morning_vibe',
    question: "What's your morning energy like?",
    emoji: "☀️",
    optionA: { text: "Quick and efficient", emoji: "⚡", category: "quick" },
    optionB: { text: "Leisurely and relaxed", emoji: "🛋️", category: "leisurely" },
    mealTypes: ['breakfast'],
    priority: 2
  },

  // Dessert specific
  {
    id: 'sweetness_level',
    question: "How sweet are you feeling?",
    emoji: "🍯",
    optionA: { text: "Just a touch", emoji: "🤏", category: "lightly_sweet" },
    optionB: { text: "Super sweet", emoji: "🍭", category: "very_sweet" },
    mealTypes: ['dessert', 'ice-cream'],
    priority: 1
  },
  {
    id: 'dessert_temperature',
    question: "Temperature preference?",
    emoji: "🌡️",
    optionA: { text: "Cool and refreshing", emoji: "🧊", category: "cold" },
    optionB: { text: "Warm and comforting", emoji: "☕", category: "hot" },
    mealTypes: ['dessert'],
    priority: 2
  },
  {
    id: 'dessert_style',
    question: "What kind of sweet treat?",
    emoji: "🍰",
    optionA: { text: "Rich and indulgent", emoji: "🍫", category: "indulgent" },
    optionB: { text: "Light and airy", emoji: "☁️", category: "light" },
    mealTypes: ['dessert'],
    priority: 1
  },

  // Ice cream specific
  {
    id: 'ice_cream_style',
    question: "What frozen treat sounds perfect?",
    emoji: "🍦",
    optionA: { text: "Classic flavors", emoji: "🍨", category: "classic" },
    optionB: { text: "Unique creations", emoji: "🌈", category: "unique" },
    mealTypes: ['ice-cream'],
    priority: 1
  },
  {
    id: 'ice_cream_texture',
    question: "Texture preference?",
    emoji: "🥄",
    optionA: { text: "Smooth and creamy", emoji: "🥛", category: "smooth" },
    optionB: { text: "Mix-ins and chunks", emoji: "🍪", category: "chunky" },
    mealTypes: ['ice-cream'],
    priority: 2
  },

  // Snacks specific
  {
    id: 'snack_texture',
    question: "What texture are you craving?",
    emoji: "🥨",
    optionA: { text: "Crunchy and crispy", emoji: "🥜", category: "crunchy" },
    optionB: { text: "Soft and chewy", emoji: "🍪", category: "soft" },
    mealTypes: ['snacks'],
    priority: 1
  },
  {
    id: 'snack_flavor',
    question: "Flavor profile preference?",
    emoji: "👅",
    optionA: { text: "Savory and salty", emoji: "🧂", category: "savory" },
    optionB: { text: "Sweet and satisfying", emoji: "🍯", category: "sweet" },
    mealTypes: ['snacks'],
    priority: 1
  },

  // Drinks specific
  {
    id: 'drink_vibe',
    question: "What's the vibe you're going for?",
    emoji: "☕",
    optionA: { text: "Cozy café atmosphere", emoji: "📚", category: "cozy" },
    optionB: { text: "Social bar scene", emoji: "🍸", category: "social" },
    mealTypes: ['drinks'],
    priority: 1
  },
  {
    id: 'caffeine',
    question: "Caffeine preference?",
    emoji: "⚡",
    optionA: { text: "Keep me energized", emoji: "🔋", category: "caffeinated" },
    optionB: { text: "Something decaf", emoji: "😴", category: "decaf" },
    mealTypes: ['drinks'],
    priority: 2
  },
  {
    id: 'drink_temperature',
    question: "Temperature preference?",
    emoji: "🌡️",
    optionA: { text: "Hot and warming", emoji: "🔥", category: "hot" },
    optionB: { text: "Cold and refreshing", emoji: "🧊", category: "cold" },
    mealTypes: ['drinks'],
    priority: 2
  },

  // General questions for variety (lower priority)
  {
    id: 'time_of_day',
    question: "What time of day is it?",
    emoji: "🕐",
    optionA: { text: "Morning energy", emoji: "🌅", category: "morning" },
    optionB: { text: "Evening relaxation", emoji: "🌙", category: "evening" },
    mealTypes: ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'],
    priority: 3
  },
  {
    id: 'social_setting',
    question: "Who are you with?",
    emoji: "👥",
    optionA: { text: "Solo time", emoji: "🧘", category: "solo" },
    optionB: { text: "With others", emoji: "👫", category: "social" },
    mealTypes: ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'],
    priority: 3
  }
];

export function getQuestionsForMealType(mealType: MealType): QuestionBankItem[] {
  return questionBank
    .filter(q => q.mealTypes.includes(mealType))
    .sort((a, b) => a.priority - b.priority); // Sort by priority (1 = high, 3 = low)
}

export function hasEnoughDataForMealType(mealType: MealType, answers: any[]): boolean {
  const minQuestions = {
    'full-meal': 6,
    'breakfast': 4,
    'dessert': 4,
    'snacks': 4,
    'ice-cream': 4,
    'drinks': 4
  };
  
  return answers.length >= minQuestions[mealType];
}