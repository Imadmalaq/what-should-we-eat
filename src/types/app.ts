export interface SwipeQuestion {
  id: string;
  question: string;
  emoji: string;
  leftOption: {
    text: string;
    emoji: string;
  };
  rightOption: {
    text: string;
    emoji: string;
  };
  leftCategory: string;
  rightCategory: string;
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
  name: string;
  description: string;
  cuisine: string;
  matchPercentage: number;
  // Legacy properties for backward compatibility
  type?: string;
  title?: string;
  emoji?: string;
  suggestions?: string[];
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
  isManual?: boolean; // Flag to indicate manual vs GPS location
}

export interface UsageData {
  count: number;
  lastUsed: string;
}