import { UserLocation, RestaurantRecommendation } from '@/types/app';

// Global restaurant service - works worldwide with location detection
// In production, this would use Google Places API or similar service
export class RestaurantService {
  private static instance: RestaurantService;

  static getInstance(): RestaurantService {
    if (!this.instance) {
      this.instance = new RestaurantService();
    }
    return this.instance;
  }

  async findSpecificRestaurant(
    cuisineType: string,
    location: UserLocation,
    preferences: {
      priceLevel?: number;
      transportMode?: string;
      maxDistance?: number;
    } = {}
  ): Promise<RestaurantRecommendation | null> {
    
    try {
      // In production, this would use Google Places API
      // For now, simulate API call with realistic restaurant data
      
      // Prioritize manual city input over coordinates
      const locationName = location.city || this.getCityFromCoordinates(location.latitude, location.longitude);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate realistic restaurant based on location and cuisine
      const restaurant = this.generateRealisticRestaurant(cuisineType, locationName, location, preferences);
      
      return restaurant;
    } catch (error) {
      console.error('Error finding restaurant:', error);
      return null;
    }
  }

  private generateRealisticRestaurant(
    cuisineType: string,
    cityName: string,
    location: UserLocation,
    preferences: any
  ): RestaurantRecommendation {
    const restaurantNames = this.getRestaurantNames(cuisineType);
    const randomName = restaurantNames[Math.floor(Math.random() * restaurantNames.length)];
    
    return {
      name: randomName,
      address: this.generateAddress(cityName),
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10, // 3.5-5.0 rating
      priceLevel: preferences.priceLevel || (Math.floor(Math.random() * 3) + 1),
      cuisine: cuisineType,
      distance: this.generateDistance(preferences.transportMode),
      speciality: this.getSpeciality(cuisineType),
      phone: this.generatePhoneNumber(cityName),
      openNow: Math.random() > 0.2, // 80% chance open
      coordinates: {
        lat: location.latitude + (Math.random() - 0.5) * 0.02, // Within ~1km
        lng: location.longitude + (Math.random() - 0.5) * 0.02
      }
    };
  }

  private getRestaurantNames(cuisine: string): string[] {
    const namesByType: { [key: string]: string[] } = {
      sushi: ['Sakura Sushi', 'Tokyo Express', 'Zen Sushi Bar', 'Wasabi Kitchen', 'Sushi Zen'],
      thai: ['Thai Garden', 'Bangkok Spice', 'Sawadee', 'Thai Palace', 'Spicy Basil'],
      italian: ['Casa Bella', 'Da Mario', 'Il Forno', 'Pasta Fresca', 'La Trattoria'],
      indian: ['Spice Palace', 'Maharaja', 'Curry House', 'Mumbai Express', 'Taj Mahal'],
      chinese: ['Golden Dragon', 'Panda Garden', 'Beijing Kitchen', 'Great Wall', 'Lucky Star'],
      mexican: ['Casa Mexico', 'El Sombrero', 'Taco Libre', 'La Cantina', 'Azteca'],
      pizza: ['Tony\'s Pizza', 'Slice Heaven', 'Wood Fire', 'Artisan Pizza', 'Mamma Mia'],
      burgers: ['Burger Barn', 'Grill House', 'Prime Patty', 'Classic Burgers', 'The Bun'],
      vietnamese: ['Pho Saigon', 'Mekong Delta', 'Little Saigon', 'Banh Mi Cafe', 'Vietnam Kitchen'],
      korean: ['Seoul Kitchen', 'K-BBQ', 'Kimchi House', 'Han River', 'Korea Town'],
      mediterranean: ['Olive Garden', 'Cyprus Taverna', 'Aegean Blue', 'Santorini', 'Mediterranean Delight']
    };
    
    return namesByType[cuisine] || ['Local Restaurant', 'City Eatery', 'Downtown Grill'];
  }

  private generateAddress(cityName: string): string {
    const streetNumbers = Math.floor(Math.random() * 999) + 1;
    const streetNames = ['Main St', 'Oak Ave', 'Park Blvd', 'First St', 'Central Ave', 'Market St'];
    const randomStreet = streetNames[Math.floor(Math.random() * streetNames.length)];
    
    return `${streetNumbers} ${randomStreet}, ${cityName}`;
  }

  private generateDistance(transportMode?: string): string {
    const walkingDistances = ['5 min walk', '8 min walk', '12 min walk', '15 min walk'];
    const drivingDistances = ['3 min drive', '7 min drive', '10 min drive', '15 min drive'];
    
    if (transportMode === 'driving') {
      return drivingDistances[Math.floor(Math.random() * drivingDistances.length)];
    }
    
    return walkingDistances[Math.floor(Math.random() * walkingDistances.length)];
  }

  private getSpeciality(cuisine: string): string {
    const specialities: { [key: string]: string[] } = {
      sushi: ['Fresh sashimi and creative rolls', 'Traditional omakase experience', 'Authentic nigiri selection'],
      thai: ['Authentic pad thai and green curry', 'Spicy tom yum soup', 'Fresh spring rolls and massaman'],
      italian: ['Homemade pasta and wood-fired pizza', 'Traditional carbonara and tiramisu', 'Fresh seafood risotto'],
      indian: ['Tandoori specialties and biryanis', 'Authentic curry and naan bread', 'Spicy vindaloo and lassi'],
      chinese: ['Szechuan dishes and dim sum', 'Peking duck and hot pot', 'Sweet and sour classics'],
      mexican: ['Fresh tacos and guacamole', 'Authentic enchiladas and margaritas', 'Spicy salsa and quesadillas'],
      pizza: ['Wood-fired Neapolitan pizza', 'Gourmet toppings and thin crust', 'Classic margherita and pepperoni'],
      vietnamese: ['Traditional pho and fresh herbs', 'Banh mi sandwiches and spring rolls', 'Grilled meat and rice bowls'],
      korean: ['Korean BBQ and kimchi', 'Bibimbap and bulgogi', 'Hot stone bowls and banchan'],
      mediterranean: ['Fresh mezze and grilled seafood', 'Hummus, pita and olive oil', 'Lamb dishes and baklava']
    };
    
    const options = specialities[cuisine] || ['Local specialties and fresh ingredients'];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generatePhoneNumber(cityName: string): string {
    // Generate realistic phone number format based on location
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    
    return `+1 ${areaCode} ${exchange} ${number}`;
  }

  private getCityFromCoordinates(lat: number, lng: number): string {
    // In production, this would use reverse geocoding API
    // For now, return a reasonable default based on coordinates
    
    // Handle case where manual location was set (coordinates are 0,0)
    if (lat === 0 && lng === 0) return 'Your City';
    
    // Major cities by approximate coordinates
    if (lat > 45 && lat < 47 && lng > 5 && lng < 8) return 'Geneva';
    if (lat > 40 && lat < 41 && lng > -74 && lng < -73) return 'New York';
    if (lat > 51 && lat < 52 && lng > -1 && lng < 1) return 'London';
    if (lat > 48 && lat < 49 && lng > 2 && lng < 3) return 'Paris';
    if (lat > 34 && lat < 35 && lng > -118 && lng < -117) return 'Los Angeles';
    if (lat > 37 && lat < 38 && lng > -122 && lng < -121) return 'San Francisco';
    if (lat > 35 && lat < 36 && lng > 139 && lng < 140) return 'Tokyo';
    
    return 'Your City';
  }

  getPriceLevelText(level: number): string {
    switch (level) {
      case 1: return "Budget-friendly";
      case 2: return "Mid-range";
      case 3: return "Higher-end";
      default: return "Mid-range";
    }
  }

  formatGoogleMapsUrl(restaurantName: string, address: string): string {
    const query = encodeURIComponent(`${restaurantName} ${address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  formatUberEatsUrl(restaurantName: string, location: string): string {
    // This would ideally use Uber Eats API to check availability
    // For now, we'll create a search URL
    const query = encodeURIComponent(`${restaurantName} ${location}`);
    return `https://www.ubereats.com/search?q=${query}`;
  }

  // Check if restaurant is likely to have Uber Eats delivery
  hasDeliveryService(cuisine: string, priceLevel: number): boolean {
    // Most restaurants in city centers have delivery
    // Higher chance for popular cuisines and mid-range prices
    const popularCuisines = ['pizza', 'burgers', 'sushi', 'thai', 'indian', 'chinese'];
    
    if (popularCuisines.includes(cuisine) && priceLevel <= 2) {
      return Math.random() > 0.2; // 80% chance
    }
    
    return Math.random() > 0.5; // 50% chance for others
  }
}