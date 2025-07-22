import { SwipeQuestion } from '@/types/app';
import { MealType } from '@/components/MealTypeSelector';

interface QuestionGenerationPrompt {
  mealType: MealType;
  previousAnswers: string[];
  questionCount: number;
  totalQuestions: number;
}

export class AIQuestionService {
  private static instance: AIQuestionService;
  private apiKey: string | null = null;
  private generatedQuestions: SwipeQuestion[] = [];

  static getInstance(): AIQuestionService {
    if (!AIQuestionService.instance) {
      AIQuestionService.instance = new AIQuestionService();
    }
    return AIQuestionService.instance;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async callAI(prompt: string): Promise<string> {
    try {
      console.log('Calling AI service with prompt:', prompt);
      
      const response = await fetch('https://caoatympgdwiwicfidar.supabase.co/functions/v1/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      console.log('AI service response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI service error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('AI service response data:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data.content || this.getFallbackQuestions(prompt);
    } catch (error) {
      console.error('AI API call failed:', error);
      return this.getFallbackQuestions(prompt);
    }
  }

  private getFallbackQuestions(prompt: string): string {
    const fallbackQuestions = [
      {
        question: "What's your energy level right now?",
        emoji: "⚡",
        optionA: { text: "Low and cozy", emoji: "😌", category: "comfort" },
        optionB: { text: "High and adventurous", emoji: "🚀", category: "adventurous" }
      },
      {
        question: "How much time do you have?",
        emoji: "⏰",
        optionA: { text: "Quick bite", emoji: "⚡", category: "quick" },
        optionB: { text: "Leisurely meal", emoji: "🕐", category: "elaborate" }
      },
      {
        question: "What's your spice tolerance today?",
        emoji: "🌶️",
        optionA: { text: "Keep it mild", emoji: "😊", category: "mild" },
        optionB: { text: "Bring the heat", emoji: "🔥", category: "spicy" }
      },
      {
        question: "Are you feeling nostalgic or curious?",
        emoji: "🤔",
        optionA: { text: "Something familiar", emoji: "🏠", category: "classic" },
        optionB: { text: "Try something new", emoji: "🌟", category: "modern" }
      },
      {
        question: "What texture sounds good?",
        emoji: "👄",
        optionA: { text: "Soft and creamy", emoji: "🥛", category: "creamy" },
        optionB: { text: "Crunchy and crispy", emoji: "🥨", category: "crunchy" }
      }
    ];

    const randomQuestion = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
    return JSON.stringify(randomQuestion);
  }

  async generateQuestion(params: QuestionGenerationPrompt): Promise<SwipeQuestion> {
    const { mealType, previousAnswers, questionCount, totalQuestions } = params;
    
    const contextualPrompts = {
      'full-meal': [
        "Generate a question about cuisine preferences for someone choosing a full meal",
        "Create a question about cooking method preferences for dinner",
        "Ask about dietary preferences for a complete meal",
        "Generate a question about dining atmosphere for a full meal",
        "Create a question about flavor intensity for dinner"
      ],
      'breakfast': [
        "Generate a morning mood question for breakfast choices",
        "Create a question about breakfast energy levels",
        "Ask about sweet vs savory breakfast preferences",
        "Generate a question about breakfast preparation time",
        "Create a question about breakfast social setting"
      ],
      'dessert': [
        "Generate a question about dessert indulgence level",
        "Create a question about dessert temperature preferences",
        "Ask about dessert texture preferences",
        "Generate a question about dessert sharing",
        "Create a question about dessert flavor intensity"
      ],
      'snacks': [
        "Generate a question about snack craving type",
        "Create a question about snack portion size",
        "Ask about snack preparation effort",
        "Generate a question about snack sharing",
        "Create a question about snack timing"
      ],
      'ice-cream': [
        "Generate a question about ice cream flavor adventure level",
        "Create a question about ice cream serving style",
        "Ask about ice cream topping preferences",
        "Generate a question about ice cream experience type",
        "Create a question about ice cream temperature preference"
      ],
      'drinks': [
        "Generate a question about drink energy level",
        "Create a question about drink temperature preference",
        "Ask about drink social setting",
        "Generate a question about drink flavor profile",
        "Create a question about drink preparation style"
      ]
    };

    const prompts = contextualPrompts[mealType] || contextualPrompts['full-meal'];
    const selectedPrompt = prompts[questionCount % prompts.length];
    
    const fullPrompt = `${selectedPrompt}. 
    
    Context:
    - Meal type: ${mealType}
    - Question ${questionCount + 1} of ${totalQuestions}
    - Previous answers: ${previousAnswers.join(', ')}
    
    Make this question unique and different from typical food choice questions. Be creative and engaging.`;

    try {
      const aiResponse = await this.callAI(fullPrompt);
      const questionData = JSON.parse(aiResponse);
      
      const question: SwipeQuestion = {
        id: `ai_generated_${Date.now()}_${Math.random()}`,
        question: questionData.question,
        emoji: questionData.emoji,
        optionA: questionData.optionA,
        optionB: questionData.optionB
      };

      this.generatedQuestions.push(question);
      return question;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      // Return fallback question
      return this.getFallbackQuestion(mealType, questionCount);
    }
  }

  private getFallbackQuestion(mealType: MealType, questionCount: number): SwipeQuestion {
    const fallbackQuestions: Record<MealType, SwipeQuestion[]> = {
      'full-meal': [
        {
          id: `fallback_meal_${questionCount}`,
          question: "What's your flavor adventure level?",
          emoji: "🗺️",
          optionA: { text: "Stick to favorites", emoji: "❤️", category: "familiar" },
          optionB: { text: "Explore new tastes", emoji: "🌟", category: "adventurous" }
        },
        {
          id: `fallback_meal_${questionCount}`,
          question: "How social is your dining mood?",
          emoji: "👥",
          optionA: { text: "Intimate and quiet", emoji: "🕯️", category: "intimate" },
          optionB: { text: "Lively and social", emoji: "🎉", category: "social" }
        }
      ],
      'breakfast': [
        {
          id: `fallback_breakfast_${questionCount}`,
          question: "How do you want to start your day?",
          emoji: "🌅",
          optionA: { text: "Gentle and light", emoji: "☁️", category: "light" },
          optionB: { text: "Bold and energizing", emoji: "⚡", category: "energizing" }
        }
      ],
      'dessert': [
        {
          id: `fallback_dessert_${questionCount}`,
          question: "What's your dessert personality today?",
          emoji: "🎭",
          optionA: { text: "Classic and comforting", emoji: "🤗", category: "classic" },
          optionB: { text: "Creative and surprising", emoji: "🎨", category: "creative" }
        }
      ],
      'snacks': [
        {
          id: `fallback_snacks_${questionCount}`,
          question: "What's your snack strategy?",
          emoji: "🎯",
          optionA: { text: "Mindful munching", emoji: "🧘", category: "mindful" },
          optionB: { text: "Pure indulgence", emoji: "😋", category: "indulgent" }
        }
      ],
      'ice-cream': [
        {
          id: `fallback_icecream_${questionCount}`,
          question: "What's your ice cream vibe?",
          emoji: "🍦",
          optionA: { text: "Nostalgic classic", emoji: "📸", category: "nostalgic" },
          optionB: { text: "Instagram worthy", emoji: "📱", category: "trendy" }
        }
      ],
      'drinks': [
        {
          id: `fallback_drinks_${questionCount}`,
          question: "What's your drink mood?",
          emoji: "🥤",
          optionA: { text: "Calm and soothing", emoji: "🕊️", category: "calming" },
          optionB: { text: "Energizing boost", emoji: "🚀", category: "energizing" }
        }
      ]
    };

    const questions = fallbackQuestions[mealType] || fallbackQuestions['full-meal'];
    return questions[questionCount % questions.length];
  }

  resetSession() {
    this.generatedQuestions = [];
  }

  getGeneratedQuestions(): SwipeQuestion[] {
    return [...this.generatedQuestions];
  }
}