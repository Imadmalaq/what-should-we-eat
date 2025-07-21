import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FoodRecommendation, RestaurantRecommendation } from '@/types/app';
import { MapPin, ExternalLink, Share, Heart, RotateCcw, Navigation, Home } from 'lucide-react';
import { RestaurantMap } from './RestaurantMap';

interface FoodResultProps {
  result: FoodRecommendation;
  restaurant?: RestaurantRecommendation;
  onRestart: () => void;
}

import { RestaurantService } from '@/services/restaurantService';

export function FoodResult({ result, restaurant, onRestart }: FoodResultProps) {
  const restaurantService = RestaurantService.getInstance();
  const [isSharing, setIsSharing] = useState(false);

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
                  <p className="text-muted-foreground text-lg">{restaurant.cuisine} • {restaurantService.getPriceLevelText(restaurant.priceLevel)}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Navigation className="w-4 h-4" />
                    <span>{restaurant.distance} away</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      onClick={() => window.open(restaurantService.formatGoogleMapsUrl(restaurant.name, restaurant.address), '_blank')}
                      size="lg"
                      className="w-full"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    
                    {restaurantService.hasDeliveryService(restaurant.cuisine, restaurant.priceLevel) && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(restaurantService.formatUberEatsUrl(restaurant.name, restaurant.address), '_blank')}
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

             {/* Restaurant Map */}
             {restaurant.coordinates && (
               <div className="animate-fade-in">
                 <RestaurantMap
                   lat={restaurant.coordinates.lat}
                   lng={restaurant.coordinates.lng}
                   name={restaurant.name}
                   address={restaurant.address}
                 />
               </div>
             )}
           </div>
         )}

        {/* No Restaurant Fallback */}
        {!restaurant && (
          <div className="text-center space-y-4 animate-fade-in">
            <Card className="p-6 shadow-soft max-w-md mx-auto">
              <CardContent className="space-y-4">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-semibold">Find {result.type} Nearby</h3>
                <p className="text-muted-foreground">
                  Let's find you the perfect {result.type} spot in your area!
                </p>
                <Button
                  onClick={() => window.open(`https://maps.google.com/?q=${result.type}+restaurant+near+me`, '_blank')}
                  size="lg"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Find {result.type} on Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            onClick={onRestart}
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