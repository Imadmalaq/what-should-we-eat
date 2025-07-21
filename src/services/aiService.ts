import { SwipeQuestion } from '@/types/app';

// This would typically use a real AI service like OpenAI
// For demo purposes, we'll simulate AI-generated questions
export class AIQuestionService {
  private static instance: AIQuestionService;
  private questionHistory: string[] = [];

  static getInstance(): AIQuestionService {
    if (!this.instance) {
      this.instance = new AIQuestionService();
    }
    return this.instance;
  }

  // Simulate GPT-generated questions based on previous answers
  async generateNextQuestion(
    previousAnswers: { [key: string]: string },
    questionIndex: number
  ): Promise<SwipeQuestion> {
    // In a real implementation, this would call GPT API
    // For now, we'll use a sophisticated question bank that adapts to previous answers
    
    const answerHistory = Object.values(previousAnswers);
    const sessionId = Math.random().toString(36).substring(7);
    
    // Create unique question based on previous answers and randomness
    const questionTemplates = this.getQuestionTemplates(answerHistory, questionIndex);
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    
    const question: SwipeQuestion = {
      id: `ai_${sessionId}_${questionIndex}`,
      question: template.question,
      emoji: template.emoji,
      optionA: template.optionA,
      optionB: template.optionB
    };

    // Store in history to avoid repetition
    this.questionHistory.push(template.question);
    
    return question;
  }

  private getQuestionTemplates(previousAnswers: string[], questionIndex: number) {
    const hasComfort = previousAnswers.includes('comfort');
    const hasSpicy = previousAnswers.includes('spicy');
    const hasHealthy = previousAnswers.includes('healthy');
    const hasInternational = previousAnswers.includes('international');
    const hasBudget = previousAnswers.includes('budget');
    const hasQuick = previousAnswers.includes('quick');

    // Dynamic question generation based on context
    const templates = [];

    if (questionIndex === 0) {
      // Opening questions - mood setters
      templates.push(
        {
          question: "What's your energy level right now?",
          emoji: "⚡",
          optionA: { text: "Low energy, keep it simple", emoji: "😴", category: "comfort" },
          optionB: { text: "Ready for an adventure", emoji: "🚀", category: "adventurous" }
        },
        {
          question: "How much time do you want to spend?",
          emoji: "⏰",
          optionA: { text: "Quick and easy", emoji: "⚡", category: "quick" },
          optionB: { text: "Take our time", emoji: "🍷", category: "leisurely" }
        },
        {
          question: "What's the vibe tonight?",
          emoji: "🌙",
          optionA: { text: "Cozy and intimate", emoji: "🕯️", category: "comfort" },
          optionB: { text: "Fun and exciting", emoji: "🎉", category: "exciting" }
        }
      );
    } else if (questionIndex === 1) {
      // Second question - adapt to first answer
      if (hasComfort) {
        templates.push({
          question: "Since you want comfort, what kind?",
          emoji: "🤗",
          optionA: { text: "Warm and hearty", emoji: "🍲", category: "hearty" },
          optionB: { text: "Light but satisfying", emoji: "🥗", category: "light" }
        });
      } else {
        templates.push({
          question: "How adventurous are your taste buds?",
          emoji: "🌶️",
          optionA: { text: "Play it safe", emoji: "😌", category: "familiar" },
          optionB: { text: "Bring on the flavors!", emoji: "🔥", category: "spicy" }
        });
      }
      
      templates.push(
        {
          question: "Temperature preference?",
          emoji: "🌡️",
          optionA: { text: "Something hot and warm", emoji: "🔥", category: "hot" },
          optionB: { text: "Cool and refreshing", emoji: "❄️", category: "cold" }
        },
        {
          question: "Cuisine preference?",
          emoji: "🌍",
          optionA: { text: "Stick to classics", emoji: "🍔", category: "familiar" },
          optionB: { text: "Explore international", emoji: "🍜", category: "international" }
        }
      );
    } else if (questionIndex === 2) {
      // Third question - further refinement
      if (hasInternational) {
        templates.push({
          question: "Which international vibe?",
          emoji: "🗺️",
          optionA: { text: "Asian flavors", emoji: "🥢", category: "asian" },
          optionB: { text: "Mediterranean/European", emoji: "🫒", category: "mediterranean" }
        });
      } else if (hasSpicy) {
        templates.push({
          question: "How much heat can you handle?",
          emoji: "🌶️",
          optionA: { text: "Mild kick", emoji: "😊", category: "mild_spicy" },
          optionB: { text: "Serious heat", emoji: "🥵", category: "very_spicy" }
        });
      } else {
        templates.push(
          {
            question: "Texture preference?",
            emoji: "🍽️",
            optionA: { text: "Creamy and smooth", emoji: "🥛", category: "creamy" },
            optionB: { text: "Crispy and crunchy", emoji: "🥖", category: "crunchy" }
          },
          {
            question: "Portion size?",
            emoji: "🍽️",
            optionA: { text: "Light meal", emoji: "🥗", category: "light" },
            optionB: { text: "Hearty portion", emoji: "🍖", category: "heavy" }
          }
        );
      }
    } else if (questionIndex === 3) {
      // Fourth question - getting specific
      templates.push(
        {
          question: "Protein preference?",
          emoji: "🥩",
          optionA: { text: "Vegetarian options", emoji: "🥬", category: "vegetarian" },
          optionB: { text: "Meat-based dishes", emoji: "🥩", category: "meat" }
        },
        {
          question: "Dining style?",
          emoji: "🍽️",
          optionA: { text: "Share everything", emoji: "💕", category: "sharing" },
          optionB: { text: "Individual plates", emoji: "🍽️", category: "individual" }
        },
        {
          question: "Budget consideration?",
          emoji: "💰",
          optionA: { text: "Budget-friendly", emoji: "💵", category: "budget" },
          optionB: { text: "Worth splurging", emoji: "💎", category: "splurge" }
        }
      );
    } else {
      // Final question - last details
      templates.push(
        {
          question: "Final decision factor?",
          emoji: "🎯",
          optionA: { text: "Quick to get", emoji: "⚡", category: "convenient" },
          optionB: { text: "Worth the wait", emoji: "⏳", category: "quality" }
        },
        {
          question: "Health consciousness?",
          emoji: "🥗",
          optionA: { text: "Indulge tonight", emoji: "🍰", category: "indulgent" },
          optionB: { text: "Keep it healthy", emoji: "🥑", category: "healthy" }
        }
      );
    }

    // Filter out questions we've already asked
    return templates.filter(t => !this.questionHistory.includes(t.question));
  }

  // Reset for new session
  resetSession(): void {
    this.questionHistory = [];
  }
}

// Advanced recommendation algorithm
export function calculateAdvancedRecommendation(answers: { [key: string]: string }): string {
  const categories = Object.values(answers);
  const scores: { [key: string]: number } = {};
  
  // Weight different factors
  categories.forEach(category => {
    scores[category] = (scores[category] || 0) + 1;
  });

  // Advanced mapping with more food types
  const foodMapping = [
    // Comfort + Quick = Pizza or Burgers
    { conditions: ['comfort', 'quick'], foods: ['pizza', 'burgers'], weight: 3 },
    { conditions: ['comfort', 'hearty'], foods: ['pasta', 'ramen'], weight: 3 },
    
    // International paths
    { conditions: ['international', 'asian'], foods: ['sushi', 'ramen', 'thai', 'chinese'], weight: 4 },
    { conditions: ['international', 'mediterranean'], foods: ['greek', 'italian', 'turkish'], weight: 4 },
    { conditions: ['asian', 'light'], foods: ['sushi', 'poke'], weight: 3 },
    { conditions: ['asian', 'spicy'], foods: ['thai', 'korean', 'indian'], weight: 3 },
    
    // Spicy preferences
    { conditions: ['spicy', 'very_spicy'], foods: ['indian', 'thai', 'mexican'], weight: 4 },
    { conditions: ['spicy', 'mild_spicy'], foods: ['mexican', 'korean'], weight: 3 },
    
    // Healthy options
    { conditions: ['healthy', 'light'], foods: ['poke', 'mediterranean', 'vietnamese'], weight: 3 },
    { conditions: ['vegetarian', 'healthy'], foods: ['indian', 'mediterranean', 'thai'], weight: 3 },
    
    // Temperature preferences
    { conditions: ['hot', 'hearty'], foods: ['ramen', 'soup', 'stew'], weight: 3 },
    { conditions: ['cold', 'light'], foods: ['sushi', 'poke', 'salads'], weight: 3 },
    
    // Budget considerations
    { conditions: ['budget', 'quick'], foods: ['pizza', 'burgers', 'tacos'], weight: 2 },
    { conditions: ['splurge', 'quality'], foods: ['sushi', 'steakhouse', 'fine_dining'], weight: 3 },
    
    // Texture preferences
    { conditions: ['creamy'], foods: ['pasta', 'risotto', 'curry'], weight: 2 },
    { conditions: ['crunchy'], foods: ['fried_chicken', 'tacos', 'tempura'], weight: 2 },
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

  // Add randomness to prevent always getting the same result
  Object.keys(foodScores).forEach(food => {
    foodScores[food] += Math.random() * 2;
  });

  // Find the highest scoring food
  const topFood = Object.entries(foodScores)
    .sort(([,a], [,b]) => b - a)[0];

  return topFood ? topFood[0] : 'surprise'; // fallback
}