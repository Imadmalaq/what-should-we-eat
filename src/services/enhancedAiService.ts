import { SwipeQuestion } from '@/types/app';
import { MealType } from '@/components/MealTypeSelector';
import { questionBank, getQuestionsForMealType, hasEnoughDataForMealType } from '@/data/questionBank';

export class EnhancedAIQuestionService {
  private static instance: EnhancedAIQuestionService;
  private questionHistory: string[] = [];
  private currentSessionAnswers: any[] = [];
  private availableQuestions: any[] = [];
  private currentMealType: MealType | null = null;

  static getInstance(): EnhancedAIQuestionService {
    if (!this.instance) {
      this.instance = new EnhancedAIQuestionService();
    }
    return this.instance;
  }

  resetSession() {
    this.questionHistory = [];
    this.currentSessionAnswers = [];
    this.availableQuestions = [];
    this.currentMealType = null;
  }

  async generateNextQuestion(currentAnswers: any, questionIndex: number): Promise<SwipeQuestion> {
    this.currentSessionAnswers = Array.isArray(currentAnswers) ? currentAnswers : Object.values(currentAnswers);
    
    // Extract meal type from answers if not already set
    if (!this.currentMealType) {
      this.currentMealType = this.extractMealType(this.currentSessionAnswers);
      if (this.currentMealType) {
        this.availableQuestions = this.shuffleArray(getQuestionsForMealType(this.currentMealType));
        console.log('AI Service - initialized questions for meal type:', this.currentMealType, 'available:', this.availableQuestions.length);
      }
    }
    
    try {
      // Check if we have enough data and can end early
      if (questionIndex >= 4 && this.currentMealType && hasEnoughDataForMealType(this.currentMealType, this.currentSessionAnswers)) {
        console.log('AI Service - enough data collected, could end quiz early');
      }
      
      // Get next unused question from filtered bank
      const question = this.getNextFilteredQuestion();
      
      // Add to history to avoid repeats
      this.questionHistory.push(question.question);
      
      return {
        id: question.id || `q_${questionIndex}`,
        question: question.question,
        emoji: question.emoji,
        optionA: question.optionA,
        optionB: question.optionB
      };
    } catch (error) {
      console.error('Error generating question:', error);
      throw error;
    }
  }

  private extractMealType(answers: any[]): MealType | null {
    // Look for meal type in answers
    for (const answer of answers) {
      if (typeof answer === 'object' && answer.mealType) {
        return answer.mealType;
      }
      if (typeof answer === 'string' && ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'].includes(answer)) {
        return answer as MealType;
      }
    }
    return null;
  }

  private getNextFilteredQuestion() {
    // Get next question that hasn't been used
    const unusedQuestions = this.availableQuestions.filter(q => 
      !this.questionHistory.includes(q.question)
    );
    
    if (unusedQuestions.length === 0) {
      console.warn('No more unused questions available');
      // Return a fallback question
      return {
        id: 'fallback',
        question: "What feels right for you?",
        emoji: "🎯",
        optionA: { text: "Something familiar", emoji: "🤗", category: "familiar" },
        optionB: { text: "Something new", emoji: "✨", category: "new" }
      };
    }
    
    // Return the next question in priority order
    const nextQuestion = unusedQuestions[0];
    console.log('AI Service - selected question:', nextQuestion.question, 'for meal type:', this.currentMealType);
    
    return nextQuestion;
  }

  private shuffleArray(array: any[]): any[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Enhanced recommendation algorithm with better variety and specificity
export function calculateEnhancedRecommendation(answers: { [key: string]: string }): string {
  const categories = Object.values(answers);
  const scores: { [key: string]: number } = {};
  
  // Weight different factors
  categories.forEach(category => {
    scores[category] = (scores[category] || 0) + 1;
  });

  // Much more comprehensive food mapping
  const foodMapping = [
    // Japanese/Asian specific
    { conditions: ['japanese', 'elegant'], foods: ['sushi'], weight: 5 },
    { conditions: ['southeast_asian', 'spicy'], foods: ['thai'], weight: 5 },
    { conditions: ['asian', 'hot'], foods: ['ramen', 'chinese'], weight: 4 },
    { conditions: ['asian', 'vegetarian'], foods: ['vietnamese'], weight: 4 },
    
    // European specific
    { conditions: ['italian', 'comfort'], foods: ['italian'], weight: 5 },
    { conditions: ['mediterranean', 'healthy'], foods: ['mediterranean'], weight: 5 },
    { conditions: ['greek', 'fresh'], foods: ['mediterranean'], weight: 4 },
    
    // Comfort combinations
    { conditions: ['comfort', 'quick'], foods: ['pizza', 'burgers'], weight: 4 },
    { conditions: ['classic_comfort'], foods: ['burgers', 'pizza'], weight: 4 },
    { conditions: ['elevated_comfort'], foods: ['pizza', 'italian'], weight: 4 },
    
    // Spice levels
    { conditions: ['balanced_spicy'], foods: ['thai', 'mexican', 'indian'], weight: 5 },
    { conditions: ['extreme_spicy'], foods: ['indian', 'korean'], weight: 5 },
    { conditions: ['spicy', 'adventurous'], foods: ['thai', 'indian', 'korean'], weight: 4 },
    
    // Health conscious
    { conditions: ['healthy', 'vegetarian'], foods: ['mediterranean', 'vietnamese'], weight: 4 },
    { conditions: ['healthy', 'light'], foods: ['sushi', 'vietnamese', 'mediterranean'], weight: 4 },
    
    // Budget considerations
    { conditions: ['budget', 'quick'], foods: ['pizza', 'burgers', 'vietnamese'], weight: 3 },
    { conditions: ['splurge', 'upscale'], foods: ['sushi', 'italian'], weight: 4 },
    
    // Temperature preferences
    { conditions: ['hot', 'comfort'], foods: ['ramen', 'chinese', 'italian'], weight: 3 },
    { conditions: ['cold', 'fresh'], foods: ['sushi', 'mediterranean'], weight: 3 },
    
    // Texture preferences
    { conditions: ['creamy'], foods: ['italian', 'indian'], weight: 3 },
    { conditions: ['crunchy'], foods: ['korean', 'mexican'], weight: 3 },
    
    // Dining style
    { conditions: ['sharing', 'social'], foods: ['pizza', 'chinese', 'mexican'], weight: 2 },
    { conditions: ['individual', 'experience'], foods: ['sushi', 'italian'], weight: 2 },
    
    // Fallback combinations
    { conditions: ['adventurous'], foods: ['thai', 'korean', 'indian', 'vietnamese'], weight: 2 },
    { conditions: ['familiar'], foods: ['pizza', 'burgers', 'italian'], weight: 2 },
    { conditions: ['international'], foods: ['sushi', 'thai', 'indian', 'mexican'], weight: 2 }
  ];

  // Calculate food scores
  const foodScores: { [key: string]: number } = {};
  
  foodMapping.forEach(mapping => {
    const matchCount = mapping.conditions.filter(condition => 
      categories.includes(condition)
    ).length;
    
    if (matchCount > 0) {
      mapping.foods.forEach(food => {
        foodScores[food] = (foodScores[food] || 0) + (matchCount * mapping.weight);
      });
    }
  });

  // Add controlled randomness to prevent repetition while still being logical
  Object.keys(foodScores).forEach(food => {
    // Smaller random factor to maintain logic while adding variety
    foodScores[food] += Math.random() * 1.5;
  });

  // Boost variety by reducing scores of recently recommended foods
  // (This would require storing recent recommendations in localStorage)
  const recentRecommendations = getRecentRecommendations();
  recentRecommendations.forEach(recentFood => {
    if (foodScores[recentFood]) {
      foodScores[recentFood] *= 0.7; // Reduce score by 30%
    }
  });

  // Find the highest scoring food
  const sortedFoods = Object.entries(foodScores)
    .sort(([,a], [,b]) => b - a);

  if (sortedFoods.length === 0) {
    // Fallback to a diverse random selection
    const fallbackFoods = ['sushi', 'thai', 'italian', 'mediterranean', 'indian', 'vietnamese', 'korean'];
    return fallbackFoods[Math.floor(Math.random() * fallbackFoods.length)];
  }

  const topFood = sortedFoods[0][0];
  
  // Store this recommendation to avoid repetition
  storeRecommendation(topFood);
  
  return topFood;
}

// Helper functions for recommendation history
function getRecentRecommendations(): string[] {
  const stored = localStorage.getItem('recent_food_recommendations');
  return stored ? JSON.parse(stored) : [];
}

function storeRecommendation(food: string): void {
  const recent = getRecentRecommendations();
  recent.unshift(food);
  // Keep only last 5 recommendations
  const trimmed = recent.slice(0, 5);
  localStorage.setItem('recent_food_recommendations', JSON.stringify(trimmed));
}
