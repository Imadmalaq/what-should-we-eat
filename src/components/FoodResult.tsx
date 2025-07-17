import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FoodRecommendation, Restaurant } from '@/types/app';
import { MapPin, ExternalLink, Share, Heart, RotateCcw, Navigation } from 'lucide-react';

interface FoodResultProps {
  result: FoodRecommendation;
  onRestart: () => void;
  userLocation?: string;
}

// Mock restaurant data - in production, this would come from Google Places API
const mockRestaurants: { [key: string]: Restaurant[] } = {
  pasta: [
    {
      id: '1',
      name: 'Nonna\'s Kitchen',
      distance: '0.3 miles',
      priceRange: '$$',
      cuisine: 'Italian',
      mapsUrl: 'https://maps.google.com/?q=italian+restaurant+near+me',
      deliveryUrl: 'https://ubereats.com'
    },
    {
      id: '2',
      name: 'Pasta Palace',
      distance: '0.7 miles',
      priceRange: '$$$',
      cuisine: 'Italian',
      mapsUrl: 'https://maps.google.com/?q=pasta+restaurant+near+me',
    },
    {
      id: '3',
      name: 'The Spaghetti Spot',
      distance: '1.2 miles',
      priceRange: '$',
      cuisine: 'Italian',
      mapsUrl: 'https://maps.google.com/?q=spaghetti+restaurant+near+me',
      deliveryUrl: 'https://doordash.com'
    }
  ],
  sushi: [
    {
      id: '4',
      name: 'Zen Sushi Bar',
      distance: '0.4 miles',
      priceRange: '$$$',
      cuisine: 'Japanese',
      mapsUrl: 'https://maps.google.com/?q=sushi+restaurant+near+me',
    },
    {
      id: '5',
      name: 'Tokyo Express',
      distance: '0.8 miles',
      priceRange: '$$',
      cuisine: 'Japanese',
      mapsUrl: 'https://maps.google.com/?q=japanese+restaurant+near+me',
      deliveryUrl: 'https://grubhub.com'
    }
  ],
  pizza: [
    {
      id: '6',
      name: 'Tony\'s Pizza',
      distance: '0.2 miles',
      priceRange: '$',
      cuisine: 'Italian',
      mapsUrl: 'https://maps.google.com/?q=pizza+near+me',
      deliveryUrl: 'https://dominos.com'
    },
    {
      id: '7',
      name: 'Artisan Pizza Co.',
      distance: '0.6 miles',
      priceRange: '$$',
      cuisine: 'Italian',
      mapsUrl: 'https://maps.google.com/?q=artisan+pizza+near+me',
    }
  ],
  tacos: [
    {
      id: '8',
      name: 'Taco Libre',
      distance: '0.5 miles',
      priceRange: '$',
      cuisine: 'Mexican',
      mapsUrl: 'https://maps.google.com/?q=taco+restaurant+near+me',
      deliveryUrl: 'https://ubereats.com'
    },
    {
      id: '9',
      name: 'Casa de Tacos',
      distance: '1.0 miles',
      priceRange: '$$',
      cuisine: 'Mexican',
      mapsUrl: 'https://maps.google.com/?q=mexican+restaurant+near+me',
    }
  ],
  ramen: [
    {
      id: '10',
      name: 'Ramen House',
      distance: '0.9 miles',
      priceRange: '$$',
      cuisine: 'Japanese',
      mapsUrl: 'https://maps.google.com/?q=ramen+restaurant+near+me',
    },
    {
      id: '11',
      name: 'Noodle Bar',
      distance: '1.3 miles',
      priceRange: '$',
      cuisine: 'Asian',
      mapsUrl: 'https://maps.google.com/?q=noodle+restaurant+near+me',
      deliveryUrl: 'https://seamless.com'
    }
  ],
  burgers: [
    {
      id: '12',
      name: 'Burger Barn',
      distance: '0.4 miles',
      priceRange: '$$',
      cuisine: 'American',
      mapsUrl: 'https://maps.google.com/?q=burger+restaurant+near+me',
      deliveryUrl: 'https://doordash.com'
    },
    {
      id: '13',
      name: 'The Burger Joint',
      distance: '0.7 miles',
      priceRange: '$',
      cuisine: 'American',
      mapsUrl: 'https://maps.google.com/?q=burger+joint+near+me',
    }
  ]
};

export function FoodResult({ result, onRestart, userLocation }: FoodResultProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    // Simulate API call to get restaurants
    const mockData = mockRestaurants[result.category] || [];
    setRestaurants(mockData);
  }, [result.category]);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareData = {
      title: `${result.title} - What Should We Eat?`,
      text: `We decided on ${result.title.toLowerCase()}! ${result.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers without Web Share API
        const text = `${shareData.text} ${shareData.url}`;
        await navigator.clipboard.writeText(text);
        alert('Result copied to clipboard!');
      }
    } catch (error) {
      // Create a shareable WhatsApp link as fallback
      const whatsappText = encodeURIComponent(`${shareData.text} ${shareData.url}`);
      window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
    }
    
    setIsSharing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-warm px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Result Header */}
        <div className="text-center space-y-4 animate-bounce-in">
          <div className="text-8xl mb-4">{result.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {result.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {result.description}
          </p>
        </div>

        {/* Restaurants */}
        {restaurants.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-center text-foreground">
              <MapPin className="w-6 h-6 inline mr-2" />
              Restaurants Near You
            </h2>
            
            <div className="grid gap-4">
              {restaurants.map((restaurant, index) => (
                <Card 
                  key={restaurant.id} 
                  className="shadow-soft hover:shadow-warm transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                        <p className="text-muted-foreground text-sm">{restaurant.cuisine}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="secondary">{restaurant.priceRange}</Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            {restaurant.distance}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(restaurant.mapsUrl, '_blank')}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                        
                        {restaurant.deliveryUrl && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => window.open(restaurant.deliveryUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Location Fallback */}
        {restaurants.length === 0 && (
          <div className="text-center space-y-4 animate-fade-in">
            <Card className="p-6 shadow-soft">
              <CardContent className="space-y-4">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">Find Restaurants Nearby</h3>
                <p className="text-muted-foreground">
                  Enable location access to see personalized restaurant recommendations for {result.category}.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://maps.google.com/?q=${result.category}+restaurant+near+me`, '_blank')}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Search Google Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            onClick={handleShare}
            disabled={isSharing}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            {isSharing ? (
              <>Loading...</>
            ) : (
              <>
                <Share className="w-4 h-4" />
                Send to Your Partner
              </>
            )}
          </Button>
          
          <Button
            onClick={onRestart}
            size="lg"
            className="flex items-center gap-2 bg-gradient-romantic hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4" />
            Make Another Decision
          </Button>
        </div>

        {/* Testimonial */}
        <div className="text-center mt-12 animate-fade-in">
          <blockquote className="text-lg italic text-muted-foreground max-w-md mx-auto">
            "Finally, no more 'I don't know what I want to eat' arguments!"
          </blockquote>
          <p className="text-sm text-muted-foreground mt-2">- Every couple ever</p>
        </div>
      </div>
    </div>
  );
}