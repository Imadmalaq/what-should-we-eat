import { MealType } from '@/components/MealTypeSelector';
import { FoodRecommendation } from '@/types/app';

interface AIRecommendation {
  title: string;
  description: string;
  searchTerm: string;
}

export class AIRecommendationService {
  private static instance: AIRecommendationService;

  static getInstance(): AIRecommendationService {
    if (!AIRecommendationService.instance) {
      AIRecommendationService.instance = new AIRecommendationService();
    }
    return AIRecommendationService.instance;
  }

  async getEnhancedRecommendation(
    mealType: MealType,
    answers: { [key: string]: string },
    baseRecommendation: FoodRecommendation
  ): Promise<FoodRecommendation> {
    try {
      console.log('Getting AI recommendation for:', { mealType, answers, baseRecommendation });
      
      const response = await fetch('https://caoatympgdwiwicfidar.supabase.co/functions/v1/generate-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealType,
          answers,
          baseRecommendation
        })
      });

      console.log('AI recommendation response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI recommendation error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('AI recommendation response data:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Parse the AI recommendation
      const aiRec: AIRecommendation = JSON.parse(data.recommendation);
      
      // Enhance the base recommendation with AI data
      return {
        ...baseRecommendation,
        title: aiRec.title,
        description: aiRec.description + ' ' + baseRecommendation.description,
        // Keep the original image and category
      };
    } catch (error) {
      console.error('AI recommendation failed:', error);
      // Return the base recommendation if AI fails
      return baseRecommendation;
    }
  }
}
