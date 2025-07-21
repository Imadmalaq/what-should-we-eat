import { SwipeQuestion } from '../types/app';

export const swipeQuestions: SwipeQuestion[] = [
  {
    id: 'spice-level',
    question: 'How do you like your food?',
    emoji: '🌶️',
    leftOption: { text: 'Mild & Gentle', emoji: '🕊️' },
    rightOption: { text: 'Spicy & Bold', emoji: '🔥' },
    leftCategory: 'mild',
    rightCategory: 'spicy'
  },
  {
    id: 'meal-size',
    question: 'What portion sounds right?',
    emoji: '🍽️',
    leftOption: { text: 'Light Bite', emoji: '🥗' },
    rightOption: { text: 'Hearty Meal', emoji: '🍖' },
    leftCategory: 'light',
    rightCategory: 'hearty'
  },
  {
    id: 'preparation',
    question: 'How should it be prepared?',
    emoji: '👨‍🍳',
    leftOption: { text: 'Fresh & Raw', emoji: '🥒' },
    rightOption: { text: 'Cooked & Warm', emoji: '🔥' },
    leftCategory: 'fresh',
    rightCategory: 'cooked'
  },
  {
    id: 'texture',
    question: 'What texture appeals to you?',
    emoji: '🥄',
    leftOption: { text: 'Smooth & Creamy', emoji: '🥛' },
    rightOption: { text: 'Crunchy & Crispy', emoji: '🥨' },
    leftCategory: 'smooth',
    rightCategory: 'crunchy'
  },
  {
    id: 'flavor-profile',
    question: 'Which flavor calls to you?',
    emoji: '😋',
    leftOption: { text: 'Sweet & Savory', emoji: '🍯' },
    rightOption: { text: 'Rich & Umami', emoji: '🍄' },
    leftCategory: 'sweet',
    rightCategory: 'umami'
  },
  {
    id: 'meal-type',
    question: 'What kind of meal?',
    emoji: '🕐',
    leftOption: { text: 'Quick Snack', emoji: '⚡' },
    rightOption: { text: 'Full Experience', emoji: '🍽️' },
    leftCategory: 'snack',
    rightCategory: 'meal'
  },
  {
    id: 'origin',
    question: 'Where should it come from?',
    emoji: '🌍',
    leftOption: { text: 'Local Classics', emoji: '🏠' },
    rightOption: { text: 'Global Flavors', emoji: '✈️' },
    leftCategory: 'local',
    rightCategory: 'global'
  },
  {
    id: 'social',
    question: 'How do you want to enjoy it?',
    emoji: '👥',
    leftOption: { text: 'Solo Treat', emoji: '🧘' },
    rightOption: { text: 'Share with Others', emoji: '👫' },
    leftCategory: 'solo',
    rightCategory: 'social'
  }
];

export const getRandomSwipeQuestions = (count: number = 5): SwipeQuestion[] => {
  const shuffled = [...swipeQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};