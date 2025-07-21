import { VercelRequest, VercelResponse } from '@vercel/node';
import { findNearbyRestaurants } from '../src/services/restaurantService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cuisineType, location, preferences } = req.body;
    
    if (!cuisineType || !location) {
      return res.status(400).json({ error: 'Cuisine type and location are required' });
    }

    const restaurants = await findNearbyRestaurants(cuisineType, location, preferences);
    
    res.status(200).json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Restaurant search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to find restaurants'
    });
  }
}