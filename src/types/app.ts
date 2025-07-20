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
  type: string;
  title: string;
  description: string;
  emoji: string;
  suggestions: string[];
  image?: string;
}

export interface RestaurantRecommendation {
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  cuisine: string;
  distance: string;
  speciality: string;
  phone: string;
  openNow: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
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