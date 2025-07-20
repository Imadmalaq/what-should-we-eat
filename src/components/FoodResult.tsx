import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FoodRecommendation, Restaurant } from '@/types/app';
import { MapPin, ExternalLink, Share, Heart, RotateCcw, Navigation, Home } from 'lucide-react';

interface FoodResultProps {
  result: FoodRecommendation;
  onRestart: () => void;
  onReturnHome: () => void;
  userLocation?: string;
}

// Enhanced restaurant data with more variety
const restaurantDatabase: { [key: string]: Restaurant[] } = {
  pasta: [
    { id: '1', name: 'Nonna\'s Kitchen', distance: '0.3 miles', priceRange: '$$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Nonna\'s+Kitchen+Italian+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '2', name: 'Pasta Palace', distance: '0.7 miles', priceRange: '$$$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Pasta+Palace+Italian+restaurant+Geneva' },
    { id: '3', name: 'Trattoria Bella', distance: '0.5 miles', priceRange: '$$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Trattoria+Bella+Italian+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  sushi: [
    { id: '4', name: 'Zen Sushi Bar', distance: '0.4 miles', priceRange: '$$$', cuisine: 'Japanese', mapsUrl: 'https://maps.google.com/?q=Zen+Sushi+Bar+Japanese+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '5', name: 'Tokyo Express', distance: '0.8 miles', priceRange: '$$', cuisine: 'Japanese', mapsUrl: 'https://maps.google.com/?q=Tokyo+Express+Japanese+restaurant+Geneva' },
    { id: '6', name: 'Sakura Sushi', distance: '0.6 miles', priceRange: '$$$', cuisine: 'Japanese', mapsUrl: 'https://maps.google.com/?q=Sakura+Sushi+Japanese+restaurant+Geneva' }
  ],
  pizza: [
    { id: '7', name: 'Tony\'s Pizza', distance: '0.2 miles', priceRange: '$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Tony\'s+Pizza+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '8', name: 'Artisan Pizza Co.', distance: '0.6 miles', priceRange: '$$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Artisan+Pizza+Co+restaurant+Geneva' },
    { id: '9', name: 'Wood Fire Pizza', distance: '0.4 miles', priceRange: '$$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Wood+Fire+Pizza+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  thai: [
    { id: '10', name: 'Bangkok Spice', distance: '0.5 miles', priceRange: '$$', cuisine: 'Thai', mapsUrl: 'https://maps.google.com/?q=Bangkok+Spice+Thai+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '11', name: 'Thai Garden', distance: '0.9 miles', priceRange: '$$$', cuisine: 'Thai', mapsUrl: 'https://maps.google.com/?q=Thai+Garden+restaurant+Geneva' },
    { id: '12', name: 'Spicy Thai House', distance: '0.7 miles', priceRange: '$$', cuisine: 'Thai', mapsUrl: 'https://maps.google.com/?q=Spicy+Thai+House+restaurant+Geneva' }
  ],
  indian: [
    { id: '13', name: 'Curry Palace', distance: '0.6 miles', priceRange: '$$', cuisine: 'Indian', mapsUrl: 'https://maps.google.com/?q=Curry+Palace+Indian+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '14', name: 'Maharaja Restaurant', distance: '0.8 miles', priceRange: '$$$', cuisine: 'Indian', mapsUrl: 'https://maps.google.com/?q=Maharaja+Indian+restaurant+Geneva' },
    { id: '15', name: 'Spice Route', distance: '0.4 miles', priceRange: '$$', cuisine: 'Indian', mapsUrl: 'https://maps.google.com/?q=Spice+Route+Indian+restaurant+Geneva' }
  ],
  mexican: [
    { id: '16', name: 'Taco Libre', distance: '0.5 miles', priceRange: '$', cuisine: 'Mexican', mapsUrl: 'https://maps.google.com/?q=Taco+Libre+Mexican+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '17', name: 'Casa de Tacos', distance: '1.0 miles', priceRange: '$$', cuisine: 'Mexican', mapsUrl: 'https://maps.google.com/?q=Casa+de+Tacos+Mexican+restaurant+Geneva' },
    { id: '18', name: 'El Mariachi', distance: '0.3 miles', priceRange: '$$', cuisine: 'Mexican', mapsUrl: 'https://maps.google.com/?q=El+Mariachi+Mexican+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  chinese: [
    { id: '19', name: 'Golden Dragon', distance: '0.4 miles', priceRange: '$$', cuisine: 'Chinese', mapsUrl: 'https://maps.google.com/?q=Golden+Dragon+Chinese+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '20', name: 'Panda Express', distance: '0.2 miles', priceRange: '$', cuisine: 'Chinese', mapsUrl: 'https://maps.google.com/?q=Panda+Express+Chinese+restaurant+Geneva' },
    { id: '21', name: 'Szechuan House', distance: '0.7 miles', priceRange: '$$', cuisine: 'Chinese', mapsUrl: 'https://maps.google.com/?q=Szechuan+House+Chinese+restaurant+Geneva' }
  ],
  korean: [
    { id: '22', name: 'Seoul BBQ', distance: '0.6 miles', priceRange: '$$$', cuisine: 'Korean', mapsUrl: 'https://maps.google.com/?q=Seoul+BBQ+Korean+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '23', name: 'K-Town Grill', distance: '0.9 miles', priceRange: '$$', cuisine: 'Korean', mapsUrl: 'https://maps.google.com/?q=K-Town+Grill+Korean+restaurant+Geneva' },
    { id: '24', name: 'Kimchi House', distance: '0.5 miles', priceRange: '$$', cuisine: 'Korean', mapsUrl: 'https://maps.google.com/?q=Kimchi+House+Korean+restaurant+Geneva' }
  ],
  vietnamese: [
    { id: '25', name: 'Pho Saigon', distance: '0.4 miles', priceRange: '$', cuisine: 'Vietnamese', mapsUrl: 'https://maps.google.com/?q=Pho+Saigon+Vietnamese+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '26', name: 'Banh Mi Cafe', distance: '0.3 miles', priceRange: '$', cuisine: 'Vietnamese', mapsUrl: 'https://maps.google.com/?q=Banh+Mi+Cafe+Vietnamese+restaurant+Geneva' },
    { id: '27', name: 'Little Saigon', distance: '0.8 miles', priceRange: '$$', cuisine: 'Vietnamese', mapsUrl: 'https://maps.google.com/?q=Little+Saigon+Vietnamese+restaurant+Geneva' }
  ],
  poke: [
    { id: '28', name: 'Poke Fresh', distance: '0.3 miles', priceRange: '$$', cuisine: 'Hawaiian', mapsUrl: 'https://maps.google.com/?q=Poke+Fresh+Hawaiian+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '29', name: 'Aloha Bowls', distance: '0.5 miles', priceRange: '$$', cuisine: 'Hawaiian', mapsUrl: 'https://maps.google.com/?q=Aloha+Bowls+Hawaiian+restaurant+Geneva' },
    { id: '30', name: 'Pacific Poke', distance: '0.7 miles', priceRange: '$$$', cuisine: 'Hawaiian', mapsUrl: 'https://maps.google.com/?q=Pacific+Poke+Hawaiian+restaurant+Geneva' }
  ],
  mediterranean: [
    { id: '31', name: 'Olive Garden Mediterranean', distance: '0.4 miles', priceRange: '$$', cuisine: 'Mediterranean', mapsUrl: 'https://maps.google.com/?q=Olive+Garden+Mediterranean+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' },
    { id: '32', name: 'Cyprus Taverna', distance: '0.6 miles', priceRange: '$$$', cuisine: 'Mediterranean', mapsUrl: 'https://maps.google.com/?q=Cyprus+Taverna+Mediterranean+restaurant+Geneva' },
    { id: '33', name: 'Mediterranean Delight', distance: '0.8 miles', priceRange: '$$', cuisine: 'Mediterranean', mapsUrl: 'https://maps.google.com/?q=Mediterranean+Delight+restaurant+Geneva' }
  ],
  // Add fallbacks for all other categories
  ramen: [
    { id: '34', name: 'Ramen House', distance: '0.5 miles', priceRange: '$$', cuisine: 'Japanese', mapsUrl: 'https://maps.google.com/?q=Ramen+House+Japanese+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  burgers: [
    { id: '35', name: 'Burger Barn', distance: '0.4 miles', priceRange: '$$', cuisine: 'American', mapsUrl: 'https://maps.google.com/?q=Burger+Barn+American+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  tacos: [
    { id: '36', name: 'Taco Bell', distance: '0.3 miles', priceRange: '$', cuisine: 'Mexican', mapsUrl: 'https://maps.google.com/?q=Taco+Bell+Mexican+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  greek: [
    { id: '37', name: 'Athens Grill', distance: '0.6 miles', priceRange: '$$', cuisine: 'Greek', mapsUrl: 'https://maps.google.com/?q=Athens+Grill+Greek+restaurant+Geneva' }
  ],
  italian: [
    { id: '38', name: 'Little Italy', distance: '0.5 miles', priceRange: '$$', cuisine: 'Italian', mapsUrl: 'https://maps.google.com/?q=Little+Italy+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ],
  turkish: [
    { id: '39', name: 'Istanbul Kitchen', distance: '0.7 miles', priceRange: '$$', cuisine: 'Turkish', mapsUrl: 'https://maps.google.com/?q=Istanbul+Kitchen+Turkish+restaurant+Geneva' }
  ],
  surprise: [
    { id: '40', name: 'Fusion Delight', distance: '0.5 miles', priceRange: '$$', cuisine: 'Fusion', mapsUrl: 'https://maps.google.com/?q=Fusion+Delight+restaurant+Geneva', uberEatsUrl: 'https://ubereats.com' }
  ]
};

export function FoodResult({ result, onRestart, onReturnHome, userLocation }: FoodResultProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    // Get ONE specific restaurant recommendation
    const availableRestaurants = restaurantDatabase[result.category] || restaurantDatabase.surprise;
    if (availableRestaurants.length > 0) {
      // Pick a random restaurant from the category
      const randomIndex = Math.floor(Math.random() * availableRestaurants.length);
      setRestaurant(availableRestaurants[randomIndex]);
    }
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

        {/* Single Restaurant Recommendation */}
        {restaurant && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-center text-foreground">
              <MapPin className="w-6 h-6 inline mr-2" />
              Perfect Spot for You
            </h2>
            
            <Card className="shadow-soft hover:shadow-warm transition-all duration-300 animate-slide-in max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <h3 className="font-bold text-2xl text-foreground">{restaurant.name}</h3>
                  <p className="text-muted-foreground text-lg">{restaurant.cuisine} • {restaurant.priceRange}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Navigation className="w-4 h-4" />
                    <span>{restaurant.distance} away</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      onClick={() => window.open(restaurant.mapsUrl, '_blank')}
                      size="lg"
                      className="w-full"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    
                    {restaurant.uberEatsUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(restaurant.uberEatsUrl, '_blank')}
                        size="lg"
                        className="w-full"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Order on Uber Eats
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Restaurant Fallback */}
        {!restaurant && (
          <div className="text-center space-y-4 animate-fade-in">
            <Card className="p-6 shadow-soft max-w-md mx-auto">
              <CardContent className="space-y-4">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">Find {result.category} Nearby</h3>
                <p className="text-muted-foreground">
                  Let's find you the perfect {result.category} spot in your area!
                </p>
                <Button
                  onClick={() => window.open(`https://maps.google.com/?q=${result.category}+restaurant+Geneva`, '_blank')}
                  size="lg"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find {result.category} on Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            onClick={onReturnHome}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          
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
            Try Again
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