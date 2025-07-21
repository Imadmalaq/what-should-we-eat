import OpenAI from 'openai';
import { SwipeQuestion } from '../types/app';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDynamicQuestion(
  previousAnswers: Record<string, string>,
  questionIndex: number
): Promise<SwipeQuestion> {
  try {
    const prompt = `Based on previous answers: ${JSON.stringify(previousAnswers)}, 
    generate a food preference question for step ${questionIndex}. 
    Respond with JSON containing:
    - id: unique identifier
    - question: the question text
    - emoji: relevant emoji
    - optionA: left swipe option
    - optionB: right swipe option`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a food quiz expert. Create engaging either/or food questions. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.9,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('AI question generation error:', error);
    
    // Fallback question
    return {
      id: `fallback-${questionIndex}`,
      question: "What sounds better right now?",
      emoji: "🤔",
      leftOption: { text: "Something sweet", emoji: "🍯" },
      rightOption: { text: "Something savory", emoji: "🧂" },
      leftCategory: "sweet",
      rightCategory: "savory"
    };
  }
}