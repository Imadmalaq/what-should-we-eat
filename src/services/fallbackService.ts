// Fallback service for when API is unavailable - stays in public repo
// This provides basic functionality without revealing your core algorithm

import { SwipeQuestion } from '@/types/app';

export class FallbackService {
  // Basic fallback questions when API is down
  static getFallbackQuestions(): SwipeQuestion[] {
    return [
      {
        id: '1',
        question: "What's your mood today?",
        emoji: "🏠",
        leftOption: { text: "Comfort & cozy", emoji: "🏠" },
        rightOption: { text: "Adventure & new", emoji: "🌟" },
        leftCategory: "comfort",
        rightCategory: "adventure"
      },
      {
        id: '2',
        question: "How hungry are you?",
        emoji: "🥗",
        leftOption: { text: "Light bite", emoji: "🥗" },
        rightOption: { text: "Full meal", emoji: "🍽️" },
        leftCategory: "light",
        rightCategory: "heavy"
      },
      {
        id: '3',
        question: "What's your flavor preference?",
        emoji: "🧄",
        leftOption: { text: "Rich & savory", emoji: "🧄" },
        rightOption: { text: "Fresh & light", emoji: "🌿" },
        leftCategory: "savory",
        rightCategory: "fresh"
      }
    ];
  }

  // Basic recommendation logic (simplified version)
  static getBasicRecommendation(answers: { [key: string]: string }): string {
    const categories = Object.values(answers);
    
    // Simple mapping - real algorithm stays private
    if (categories.includes('comfort') && categories.includes('heavy')) {
      return 'Pizza or Burger';
    }
    if (categories.includes('fresh') && categories.includes('light')) {
      return 'Salad or Sushi';
    }
    if (categories.includes('adventure')) {
      return 'Try a new cuisine!';
    }
    
    return 'Something delicious!';
  }
}