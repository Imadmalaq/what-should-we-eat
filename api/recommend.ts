import { VercelRequest, VercelResponse } from '@vercel/node';
import { generateFoodRecommendation } from '../src/services/aiService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers } = req.body;
    
    if (!answers) {
      return res.status(400).json({ error: 'Answers are required' });
    }

    const recommendation = await generateFoodRecommendation(answers);
    
    res.status(200).json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    console.error('Food recommendation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate food recommendation'
    });
  }
}