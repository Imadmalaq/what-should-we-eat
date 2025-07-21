import { SwipeQuestion } from '@/types/app';

// Enhanced AI service with more dynamic and varied questions
export class EnhancedAIQuestionService {
  private static instance: EnhancedAIQuestionService;
  private questionHistory: string[] = [];
  private sessionQuestions: SwipeQuestion[] = [];

  static getInstance(): EnhancedAIQuestionService {
    if (!this.instance) {
      this.instance = new EnhancedAIQuestionService();
    }
    return this.instance;
  }

  async generateNextQuestion(
    previousAnswers: { [key: string]: string | any },
    questionIndex: number
  ): Promise<SwipeQuestion> {
    const answerHistory = Object.values(previousAnswers);
    const sessionId = Math.random().toString(36).substring(7);
    
    // Get contextual question based on previous answers
    const questionTemplate = this.getContextualQuestion(answerHistory, questionIndex);
    
    const question: SwipeQuestion = {
      id: `enhanced_${sessionId}_${questionIndex}`,
      question: questionTemplate.question,
      emoji: questionTemplate.emoji,
      optionA: questionTemplate.optionA,
      optionB: questionTemplate.optionB
    };

    this.questionHistory.push(questionTemplate.question);
    this.sessionQuestions.push(question);
    
    return question;
  }

  private getContextualQuestion(previousAnswers: any[], questionIndex: number) {
    // Extract meal type from answers
    const mealType = previousAnswers.find(answer => 
      typeof answer === 'string' && ['full-meal', 'breakfast', 'dessert', 'snacks', 'ice-cream', 'drinks'].includes(answer)
    );
    
    const hasComfort = previousAnswers.includes('comfort');
    const hasAdventurous = previousAnswers.includes('adventurous');
    const hasSpicy = previousAnswers.includes('spicy');
    const hasHealthy = previousAnswers.includes('healthy');
    const hasInternational = previousAnswers.includes('international');
    const hasBudget = previousAnswers.includes('budget');
    const hasQuick = previousAnswers.includes('quick');
    const hasAsian = previousAnswers.includes('asian');
    const hasMediterranean = previousAnswers.includes('mediterranean');
    const hasVegetarian = previousAnswers.includes('vegetarian');

    // More comprehensive question bank with 10+ questions
    const questionBanks = {
      // Opening questions (0-1) - adapted for meal type
      opening: this.getMealTypeQuestions(mealType),

      // Cultural exploration (2-3)
      cultural: [
        {
          question: "Where should we travel through food?",
          emoji: "🌍",
          optionA: { text: "Stay in familiar territory", emoji: "🏠", category: "familiar" },
          optionB: { text: "Take me on a culinary journey", emoji: "✈️", category: "international" }
        },
        {
          question: "What's your relationship with spice?",
          emoji: "🌶️",
          optionA: { text: "Spice is nice, but gentle", emoji: "😊", category: "mild" },
          optionB: { text: "Bring the heat!", emoji: "🔥", category: "spicy" }
        }
      ],

      // Specific preferences (4-6)
      specific: [
        {
          question: "Temperature preference tonight?",
          emoji: "🌡️",
          optionA: { text: "Something warm and comforting", emoji: "☕", category: "hot" },
          optionB: { text: "Fresh and cooling", emoji: "🧊", category: "cold" }
        },
        {
          question: "Texture experience you're craving?",
          emoji: "👅",
          optionA: { text: "Smooth and creamy", emoji: "🥛", category: "creamy" },
          optionB: { text: "Crispy and textured", emoji: "🥖", category: "crunchy" }
        },
        {
          question: "Protein philosophy for tonight?",
          emoji: "🥩",
          optionA: { text: "Plant-powered", emoji: "🌱", category: "vegetarian" },
          optionB: { text: "Meat-centric", emoji: "🥩", category: "meat" }
        }
      ],

      // Contextual based on previous answers
      adaptive: {
        international_asian: {
          question: "Which Asian experience calls to you?",
          emoji: "🥢",
          optionA: { text: "Japanese precision and elegance", emoji: "🍣", category: "japanese" },
          optionB: { text: "Bold Southeast Asian flavors", emoji: "🍜", category: "southeast_asian" }
        },
        international_mediterranean: {
          question: "Mediterranean mood?",
          emoji: "🫒",
          optionA: { text: "Italian comfort", emoji: "🍝", category: "italian" },
          optionB: { text: "Greek freshness", emoji: "🥗", category: "greek" }
        },
        comfort_quick: {
          question: "Quick comfort food style?",
          emoji: "⚡",
          optionA: { text: "Classic and reliable", emoji: "🍔", category: "classic_comfort" },
          optionB: { text: "Elevated comfort", emoji: "🍕", category: "elevated_comfort" }
        },
        spicy_adventurous: {
          question: "How adventurous with the heat?",
          emoji: "🌶️",
          optionA: { text: "Flavorful heat with balance", emoji: "🔥", category: "balanced_spicy" },
          optionB: { text: "Challenge my taste buds", emoji: "🥵", category: "extreme_spicy" }
        }
      },

      // Practical considerations (7-9)
      practical: [
        {
          question: "Time and effort tonight?",
          emoji: "⏰",
          optionA: { text: "Quick and convenient", emoji: "⚡", category: "quick" },
          optionB: { text: "Worth taking time for", emoji: "🕒", category: "leisurely" }
        },
        {
          question: "Budget considerations?",
          emoji: "💰",
          optionA: { text: "Keep it reasonable", emoji: "💵", category: "budget" },
          optionB: { text: "Treat myself tonight", emoji: "💎", category: "splurge" }
        },
        {
          question: "Health consciousness level?",
          emoji: "🥗",
          optionA: { text: "Let me indulge tonight", emoji: "🍰", category: "indulgent" },
          optionB: { text: "Keep it on the lighter side", emoji: "🥑", category: "healthy" }
        }
      ],

      // Final refinement (10+)
      refinement: [
        {
          question: "Dining experience vibe?",
          emoji: "🍽️",
          optionA: { text: "Casual and relaxed", emoji: "😌", category: "casual" },
          optionB: { text: "A bit more upscale", emoji: "🎩", category: "upscale" }
        },
        {
          question: "Social aspect preference?",
          emoji: "👥",
          optionA: { text: "Perfect for sharing", emoji: "🤝", category: "sharing" },
          optionB: { text: "My own individual experience", emoji: "🎯", category: "individual" }
        },
        {
          question: "Final decision factor?",
          emoji: "🎪",
          optionA: { text: "Convenience wins", emoji: "📍", category: "convenient" },
          optionB: { text: "Experience matters most", emoji: "⭐", category: "experience" }
        }
      ]
    };

    // Determine which question to ask based on index and context
    let selectedQuestion;

    if (questionIndex <= 1) {
      // Opening questions
      selectedQuestion = this.getRandomUnusedQuestion(questionBanks.opening);
    } else if (questionIndex <= 3) {
      // Cultural exploration
      selectedQuestion = this.getRandomUnusedQuestion(questionBanks.cultural);
    } else if (questionIndex <= 6) {
    // Check for adaptive questions first
      if (hasInternational && hasAsian && questionBanks.adaptive.international_asian && 
          !this.questionHistory.includes(questionBanks.adaptive.international_asian.question)) {
        selectedQuestion = questionBanks.adaptive.international_asian;
      } else if (hasInternational && hasMediterranean && questionBanks.adaptive.international_mediterranean &&
                 !this.questionHistory.includes(questionBanks.adaptive.international_mediterranean.question)) {
        selectedQuestion = questionBanks.adaptive.international_mediterranean;
      } else if (hasComfort && hasQuick && questionBanks.adaptive.comfort_quick &&
                 !this.questionHistory.includes(questionBanks.adaptive.comfort_quick.question)) {
        selectedQuestion = questionBanks.adaptive.comfort_quick;
      } else if (hasSpicy && hasAdventurous && questionBanks.adaptive.spicy_adventurous &&
                 !this.questionHistory.includes(questionBanks.adaptive.spicy_adventurous.question)) {
        selectedQuestion = questionBanks.adaptive.spicy_adventurous;
      } else {
        selectedQuestion = this.getRandomUnusedQuestion(questionBanks.specific);
      }
    } else if (questionIndex <= 9) {
      // Practical considerations
      selectedQuestion = this.getRandomUnusedQuestion(questionBanks.practical);
    } else {
      // Final refinement
      selectedQuestion = this.getRandomUnusedQuestion(questionBanks.refinement);
    }

    // Fallback if we somehow don't have a question
    if (!selectedQuestion) {
      selectedQuestion = {
        question: "What feels right tonight?",
        emoji: "🎯",
        optionA: { text: "Go with the flow", emoji: "🌊", category: "flexible" },
        optionB: { text: "Something decisive", emoji: "⚡", category: "decisive" }
      };
    }

    return selectedQuestion;
  }

  private getMealTypeQuestions(mealType?: string) {
    const baseQuestions = {
      'full-meal': [
        {
          question: "What's your current mood for this meal?",
          emoji: "🍽️",
          optionA: { text: "Relaxed and cozy", emoji: "😌", category: "comfort" },
          optionB: { text: "Energetic and bold", emoji: "⚡", category: "adventurous" }
        },
        {
          question: "How much culinary adventure are you seeking?",
          emoji: "🌟",
          optionA: { text: "Familiar and satisfying", emoji: "🤗", category: "familiar" },
          optionB: { text: "Something new and exciting", emoji: "🚀", category: "adventurous" }
        }
      ],
      'breakfast': [
        {
          question: "How do you want to start your day?",
          emoji: "🌅",
          optionA: { text: "Light and energizing", emoji: "🥗", category: "healthy" },
          optionB: { text: "Hearty and filling", emoji: "🥞", category: "comfort" }
        },
        {
          question: "Morning vibe check?",
          emoji: "☀️",
          optionA: { text: "Quick and efficient", emoji: "⚡", category: "quick" },
          optionB: { text: "Leisurely and indulgent", emoji: "🛋️", category: "leisurely" }
        }
      ],
      'dessert': [
        {
          question: "What kind of sweet satisfaction are you craving?",
          emoji: "🍰",
          optionA: { text: "Rich and indulgent", emoji: "🍫", category: "indulgent" },
          optionB: { text: "Light and refreshing", emoji: "🍓", category: "light" }
        },
        {
          question: "Temperature preference for your sweet treat?",
          emoji: "🌡️",
          optionA: { text: "Cool and refreshing", emoji: "🧊", category: "cold" },
          optionB: { text: "Warm and comforting", emoji: "☕", category: "hot" }
        }
      ],
      'snacks': [
        {
          question: "What kind of snack experience are you after?",
          emoji: "🥨",
          optionA: { text: "Crunchy and satisfying", emoji: "🥜", category: "crunchy" },
          optionB: { text: "Soft and comforting", emoji: "🍪", category: "soft" }
        },
        {
          question: "Flavor profile for your snack?",
          emoji: "🎯",
          optionA: { text: "Savory and salty", emoji: "🧂", category: "savory" },
          optionB: { text: "Sweet and delightful", emoji: "🍯", category: "sweet" }
        }
      ],
      'ice-cream': [
        {
          question: "What frozen treat experience sounds perfect?",
          emoji: "🍦",
          optionA: { text: "Classic and creamy", emoji: "🍨", category: "classic" },
          optionB: { text: "Unique and adventurous", emoji: "🍧", category: "adventurous" }
        },
        {
          question: "Texture preference for your frozen treat?",
          emoji: "🥄",
          optionA: { text: "Smooth and rich", emoji: "🥛", category: "creamy" },
          optionB: { text: "Mix-ins and crunch", emoji: "🍪", category: "textured" }
        }
      ],
      'drinks': [
        {
          question: "What's the vibe you're going for?",
          emoji: "☕",
          optionA: { text: "Cozy café atmosphere", emoji: "📚", category: "cozy" },
          optionB: { text: "Social bar scene", emoji: "🍸", category: "social" }
        },
        {
          question: "Energy level preference?",
          emoji: "⚡",
          optionA: { text: "Caffeinated and energizing", emoji: "☕", category: "energizing" },
          optionB: { text: "Relaxing and smooth", emoji: "🍷", category: "relaxing" }
        }
      ]
    };

    return baseQuestions[mealType as keyof typeof baseQuestions] || baseQuestions['full-meal'];
  }

  private getRandomUnusedQuestion(questions: any[]) {
    const unusedQuestions = questions.filter(q => !this.questionHistory.includes(q.question));
    if (unusedQuestions.length === 0) {
      // If all questions in this category have been used, reset the history for this session
      this.questionHistory = [];
      return questions[Math.floor(Math.random() * questions.length)];
    }
    return unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
  }

  resetSession(): void {
    this.questionHistory = [];
    this.sessionQuestions = [];
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
