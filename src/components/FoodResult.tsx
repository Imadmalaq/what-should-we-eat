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
  // Extract clean food type from result title
  const extractFoodType = (title: string): string => {
    // Remove emojis, exclamation marks, and common descriptive words
    return title
      .replace(/[🌶️🍕🍜🥘🍛🍝🥗🍲🥙🌮🌯🍤🍣🍱🍙🥟🍳🥞🧇🥓🥨🧀🥪🌭🍔🍟🥐🥖🍞🎂🍰🧁🍪🍩🍫🍬🍭🍮🍯🍼☕🫖🍵🥤🧃🥛🍺🍻🥂🍷🥃🍸🍹🍾🧊]/g, '') // Remove food emojis
      .replace(/[!?.,]/g, '') // Remove punctuation
      .replace(/\b(adventure|delight|experience|craving|mood|vibes?|time|tonight|today)\b/gi, '') // Remove descriptive words
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  const handleFindNearby = () => {
    try {
      const cleanFoodType = extractFoodType(result.title);
      const safeFoodType = cleanFoodType || 'food';
      const encodedFood = encodeURIComponent(safeFoodType);
      window.open(`https://www.google.com/maps/search/${encodedFood}+near+me`, '_blank');
    } catch (error) {
      console.error('Error opening Google Maps:', error);
      window.open(`https://www.google.com/maps/search/food+near+me`, '_blank');
    }
  };

  const handleOrderUberEats = () => {
    try {
      const cleanFoodType = extractFoodType(result.title);
      const safeFoodType = cleanFoodType || 'food';
      const encodedFood = encodeURIComponent(safeFoodType);
      window.open(`https://www.ubereats.com/search?q=${encodedFood}`, '_blank');
    } catch (error) {
      console.error('Error opening Uber Eats:', error);
      window.open(`https://www.ubereats.com/search?q=food`, '_blank');
    }
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

        {/* Action Buttons */}
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-foreground text-center">Ready to get your food?</h3>
          <p className="text-muted-foreground mb-6 text-center">Find {result.title.toLowerCase()} near you!</p>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleFindNearby}
              className="flex items-center gap-2"
              variant="food"
              size="lg"
            >
              <MapPin className="w-4 h-4" />
              Find {result.title} Near Me
            </Button>
            
            <Button 
              onClick={handleOrderUberEats}
              className="flex items-center gap-2"
              variant="outline"
              size="lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Order on Uber Eats
            </Button>
          </div>
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