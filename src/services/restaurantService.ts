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
      // Guard clause: ensure we have a valid city
      if ((!location.city || location.city.trim() === '' || location.city === 'Your City') &&
          (location.latitude === 0 && location.longitude === 0)) {
        throw new Error('City unresolved—prompt manual entry');
      }

      // In production, this would use Google Places API
      // For now, simulate API call with realistic restaurant data
      
      // Prioritize manual city input over coordinates, ensure valid location
      let locationName: string;
      
      if (location.isManualInput && location.city && location.city !== 'Your City') {
        // Manual input takes absolute priority
        locationName = location.city;
        console.log('Restaurant service - using manual input city:', locationName);
      } else if (location.city && location.city !== 'Your City') {
        // Use geocoded city from coordinates
        locationName = location.city;
        console.log('Restaurant service - using geocoded city:', locationName);
      } else if (location.latitude !== 0 && location.longitude !== 0) {
        // Try to resolve from coordinates
        locationName = this.getCityFromCoordinates(location.latitude, location.longitude);
        console.log('Restaurant service - resolved city from coordinates:', locationName);
      } else {
        // Fallback to default
        locationName = 'Your City';
        console.log('Restaurant service - using fallback city:', locationName);
      }
      
      console.log('Restaurant service - final location input:', location);
      console.log('Restaurant service - final resolved city:', locationName);
      
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
    
    // Handle case where no valid coordinates are available
    if (lat === 0 && lng === 0) return 'Your City';
    
    // Major cities by approximate coordinates (realistic ranges)
    if (lat >= 46.1 && lat <= 46.3 && lng >= 6.0 && lng <= 6.3) return 'Geneva';
    if (lat >= 40.6 && lat <= 40.9 && lng >= -74.1 && lng <= -73.9) return 'New York';
    if (lat >= 51.4 && lat <= 51.6 && lng >= -0.2 && lng <= 0.1) return 'London';
    if (lat >= 48.8 && lat <= 48.9 && lng >= 2.2 && lng <= 2.5) return 'Paris';
    if (lat >= 34.0 && lat <= 34.1 && lng >= -118.5 && lng <= -118.2) return 'Los Angeles';
    if (lat >= 37.7 && lat <= 37.8 && lng >= -122.5 && lng <= -122.4) return 'San Francisco';
    if (lat >= 35.6 && lat <= 35.7 && lng >= 139.6 && lng <= 139.8) return 'Tokyo';
    if (lat >= 52.4 && lat <= 52.6 && lng >= 13.3 && lng <= 13.5) return 'Berlin';
    if (lat >= 41.8 && lat <= 42.0 && lng >= 12.4 && lng <= 12.6) return 'Rome';
    if (lat >= 55.7 && lat <= 55.8 && lng >= 37.5 && lng <= 37.7) return 'Moscow';
    
    // Fallback based on general regions
    if (lat >= 40 && lat <= 50 && lng >= -10 && lng <= 10) return 'European City';
    if (lat >= 25 && lat <= 50 && lng >= -130 && lng <= -60) return 'American City';
    if (lat >= 30 && lat <= 45 && lng >= 120 && lng <= 150) return 'Asian City';
    
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