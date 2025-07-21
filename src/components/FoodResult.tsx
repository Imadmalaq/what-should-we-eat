import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FoodRecommendation, RestaurantRecommendation } from '@/types/app';
import { MapPin, ExternalLink, Share, Heart, RotateCcw, Navigation, Home, RefreshCcw } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';

interface FoodResultProps {
  result: FoodRecommendation;
  onRestart: () => void;
}

import { RestaurantService } from '@/services/restaurantService';

export function FoodResult({ result, onRestart }: FoodResultProps) {
  const handleFindNearby = () => {
    const searchQuery = `${result.title} near me`;
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();


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

        {/* Find Places Button */}
        <div className="bg-card rounded-lg p-6 border shadow-sm text-center">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Ready to find places?</h3>
          <p className="text-muted-foreground mb-4">Let's find {result.title.toLowerCase()} near you!</p>
          <Button 
            onClick={handleFindNearby}
            className="flex items-center gap-2 mx-auto"
            variant="food"
          >
            <MapPin className="w-4 h-4" />
            Find {result.title} Near Me
          </Button>
        </div>

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