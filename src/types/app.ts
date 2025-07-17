export interface SwipeQuestion {
  id: string;
  question: string;
  emoji: string;
  optionA: {
    text: string;
    emoji: string;
    category: string;
  };
  optionB: {
    text: string;
    emoji: string;
    category: string;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  distance: string;
  priceRange: '$' | '$$' | '$$$';
  cuisine: string;
  mapsUrl: string;
  uberEatsUrl?: string;
}

export interface FoodRecommendation {
  category: string;
  title: string;
  description: string;
  emoji: string;
  restaurants: Restaurant[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  postalCode?: string;
}

export interface UsageData {
  count: number;
  lastUsed: string;
}