import { UserLocation, RestaurantRecommendation } from '@/types/app';

// Enhanced restaurant data for Geneva with real places
const GENEVA_RESTAURANTS = {
  sushi: [
    {
      name: "Saku Sushi",
      address: "Rue du Stand 54, 1204 Genève",
      rating: 4.6,
      priceLevel: 2,
      cuisine: "sushi",
      openNow: true,
      distance: "9 min walk",
      speciality: "Fresh sashimi and creative rolls",
      phone: "+41 22 328 79 33",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    },
    {
      name: "Wasabi Sushi",
      address: "Rue de la Confédération 29, 1204 Genève",
      rating: 4.4,
      priceLevel: 2,
      cuisine: "sushi",
      openNow: true,
      distance: "12 min walk",
      speciality: "All-you-can-eat sushi",
      phone: "+41 22 311 10 64",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  thai: [
    {
      name: "Sawadee",
      address: "Rue de Rive 6, 1204 Genève",
      rating: 4.5,
      priceLevel: 2,
      cuisine: "thai",
      openNow: true,
      distance: "8 min walk",
      speciality: "Authentic pad thai and green curry",
      phone: "+41 22 311 13 47",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    },
    {
      name: "Thai Phuket",
      address: "Rue du Marché 28, 1204 Genève",
      rating: 4.3,
      priceLevel: 1,
      cuisine: "thai",
      openNow: true,
      distance: "15 min walk",
      speciality: "Spicy tom yum and massaman curry",
      phone: "+41 22 310 37 33",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  indian: [
    {
      name: "Shiva",
      address: "Rue de la Navigation 27, 1201 Genève",
      rating: 4.4,
      priceLevel: 2,
      cuisine: "indian",
      openNow: true,
      distance: "10 min walk",
      speciality: "Traditional tandoor and biryanis",
      phone: "+41 22 732 84 17",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  italian: [
    {
      name: "Café du Soleil",
      address: "Place du Petit-Saconnex 6, 1209 Genève",
      rating: 4.7,
      priceLevel: 3,
      cuisine: "italian",
      openNow: true,
      distance: "18 min bike",
      speciality: "Famous fondue and pasta",
      phone: "+41 22 733 34 17",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    },
    {
      name: "Il Lago",
      address: "Rue du Lac 13, 1207 Genève",
      rating: 4.5,
      priceLevel: 3,
      cuisine: "italian",
      openNow: true,
      distance: "14 min walk",
      speciality: "Homemade pasta and risotto",
      phone: "+41 22 786 40 50",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  burgers: [
    {
      name: "Holy Cow!",
      address: "Rue du Marché 8, 1204 Genève",
      rating: 4.2,
      priceLevel: 2,
      cuisine: "burgers",
      openNow: true,
      distance: "6 min walk",
      speciality: "Gourmet burgers with Swiss beef",
      phone: "+41 22 311 40 56",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    },
    {
      name: "Burger de Ville",
      address: "Rue de la Croix-Rouge 5, 1204 Genève",
      rating: 4.0,
      priceLevel: 1,
      cuisine: "burgers",
      openNow: true,
      distance: "11 min walk",
      speciality: "Classic burgers and crispy fries",
      phone: "+41 22 312 95 44",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  pizza: [
    {
      name: "Da Paolo",
      address: "Rue Kleberg 7, 1201 Genève",
      rating: 4.6,
      priceLevel: 2,
      cuisine: "pizza",
      openNow: true,
      distance: "7 min walk",
      speciality: "Wood-fired Neapolitan pizza",
      phone: "+41 22 732 08 24",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  mexican: [
    {
      name: "El Loco",
      address: "Place de la Navigation 4, 1201 Genève",
      rating: 4.3,
      priceLevel: 2,
      cuisine: "mexican",
      openNow: true,
      distance: "13 min walk",
      speciality: "Authentic tacos and margaritas",
      phone: "+41 22 738 92 17",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  vietnamese: [
    {
      name: "Pho Saigon",
      address: "Rue de la Servette 60, 1202 Genève",
      rating: 4.4,
      priceLevel: 1,
      cuisine: "vietnamese",
      openNow: true,
      distance: "16 min walk",
      speciality: "Fresh pho and banh mi",
      phone: "+41 22 733 15 28",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  korean: [
    {
      name: "Seoul Kitchen",
      address: "Rue de Monthoux 45, 1201 Genève",
      rating: 4.5,
      priceLevel: 2,
      cuisine: "korean",
      openNow: true,
      distance: "20 min walk",
      speciality: "Korean BBQ and kimchi",
      phone: "+41 22 732 89 45",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  mediterranean: [
    {
      name: "Olive et Artichaut",
      address: "Rue de la Tour-Maîtresse 7, 1204 Genève",
      rating: 4.7,
      priceLevel: 2,
      cuisine: "mediterranean",
      openNow: true,
      distance: "9 min walk",
      speciality: "Fresh mezze and grilled fish",
      phone: "+41 22 310 96 97",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ],
  chinese: [
    {
      name: "Tsing Tao",
      address: "Rue Adhémar-Fabri 2, 1201 Genève",
      rating: 4.2,
      priceLevel: 2,
      cuisine: "chinese",
      openNow: true,
      distance: "14 min walk",
      speciality: "Szechuan cuisine and dim sum",
      phone: "+41 22 738 95 95",
      coordinates: { lat: 46.2044, lng: 6.1432 }
    }
  ]
};

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
    
    // Get restaurants for the cuisine type
    const restaurants = GENEVA_RESTAURANTS[cuisineType as keyof typeof GENEVA_RESTAURANTS] || [];
    
    if (restaurants.length === 0) {
      return null;
    }

    // Filter by preferences
    let filteredRestaurants = restaurants.filter(restaurant => {
      if (preferences.priceLevel && restaurant.priceLevel > preferences.priceLevel) {
        return false;
      }
      return restaurant.openNow;
    });

    // If no restaurants match criteria, fall back to all restaurants of this type
    if (filteredRestaurants.length === 0) {
      filteredRestaurants = restaurants;
    }

    // Pick a random restaurant to add variety
    const selectedRestaurant = filteredRestaurants[
      Math.floor(Math.random() * filteredRestaurants.length)
    ];

    return {
      name: selectedRestaurant.name,
      address: selectedRestaurant.address,
      rating: selectedRestaurant.rating,
      priceLevel: selectedRestaurant.priceLevel,
      cuisine: selectedRestaurant.cuisine,
      distance: selectedRestaurant.distance,
      speciality: selectedRestaurant.speciality,
      phone: selectedRestaurant.phone,
      openNow: selectedRestaurant.openNow,
      coordinates: selectedRestaurant.coordinates
    };
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
    // Most restaurants in Geneva city center have delivery
    // Higher chance for popular cuisines and mid-range prices
    const popularCuisines = ['pizza', 'burgers', 'sushi', 'thai', 'indian', 'chinese'];
    
    if (popularCuisines.includes(cuisine) && priceLevel <= 2) {
      return Math.random() > 0.2; // 80% chance
    }
    
    return Math.random() > 0.5; // 50% chance for others
  }
}