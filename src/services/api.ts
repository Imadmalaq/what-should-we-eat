// Public API client - this will stay in the public repo
// Points to your private backend API

// For unified architecture, we'll use local services directly instead of external API
const USE_LOCAL_SERVICES = true;

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class PublicAPIClient {
  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    try {
      if (USE_LOCAL_SERVICES) {
        // Use local services for unified architecture
        return { success: false, error: 'Using local services instead of API' };
      }
      
      // For external API calls (when USE_LOCAL_SERVICES is false)
      console.log(`API call to ${endpoint}:`, options.body);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return { 
        success: false, 
        error: 'Backend API not connected - using fallback logic' 
      };
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