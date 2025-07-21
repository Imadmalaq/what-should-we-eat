// Public API client - this will stay in the public repo
// Points to your private backend API

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-private-api.vercel.app/api'  // Replace with your actual API URL
  : 'http://localhost:3001/api';  // Local development

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class PublicAPIClient {
  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'API request failed' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // AI Question Generation
  static async generateQuestion(previousAnswers: { [key: string]: string }, questionIndex: number) {
    return this.request('/ai/generate-question', {
      method: 'POST',
      body: JSON.stringify({ previousAnswers, questionIndex }),
    });
  }

  // Food Recommendation
  static async getFoodRecommendation(answers: { [key: string]: string }) {
    return this.request('/ai/recommend-food', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  // Restaurant Finding
  static async findRestaurant(cuisineType: string, location: any, preferences: any = {}) {
    return this.request('/restaurants/find', {
      method: 'POST',
      body: JSON.stringify({ cuisineType, location, preferences }),
    });
  }

  // Usage Tracking
  static async trackUsage(sessionData: any) {
    return this.request('/usage/track', {
      method: 'POST',
      body: JSON.stringify({ sessionData }),
    });
  }
}