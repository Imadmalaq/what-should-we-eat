import OpenAI from 'openai';
import { FoodRecommendation } from '../types/app';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFoodRecommendation(answers: Record<string, string>): Promise<FoodRecommendation> {
  try {
    const prompt = `Based on these food preferences and answers: ${JSON.stringify(answers)}, 
    recommend a specific food dish. Respond with a JSON object containing:
    - type: cuisine type
    - title: specific dish name
    - description: why this matches their preferences
    - emoji: relevant emoji
    - suggestions: array of 3 specific restaurant recommendations or cooking tips`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a food recommendation expert. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('AI recommendation error:', error);
    
    // Fallback recommendation
    return {
      name: "Classic Burger",
      description: "A timeless choice that satisfies most cravings",
      cuisine: "American",
      matchPercentage: 85,
      type: "comfort food",
      title: "Classic Burger",
      emoji: "🍔",
      suggestions: [
        "Try a local burger joint",
        "Add bacon and cheese for extra flavor",
        "Pair with crispy fries"
      ]
    };
  }
}