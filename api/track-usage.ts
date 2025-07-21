import { VercelRequest, VercelResponse } from '@vercel/node';
import { trackUserSession } from '../src/services/analyticsService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionData } = req.body;
    
    await trackUserSession(sessionData);
    
    res.status(200).json({
      success: true,
      message: 'Usage tracked successfully'
    });
  } catch (error) {
    console.error('Usage tracking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track usage'
    });
  }
}