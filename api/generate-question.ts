import { VercelRequest, VercelResponse } from '@vercel/node';
import { generateDynamicQuestion } from '../src/services/enhancedAiService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { previousAnswers, questionIndex } = req.body;
    
    const question = await generateDynamicQuestion(previousAnswers, questionIndex);
    
    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate question'
    });
  }
}