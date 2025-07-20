import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SwipeFlow } from '@/components/SwipeFlow';
import { FoodResult } from '@/components/FoodResult';
import { LocationPrompt } from '@/components/LocationPrompt';
import { PaywallModal } from '@/components/PaywallModal';
import { FoodRecommendation, RestaurantRecommendation } from '@/types/app';
import { useUsageTracking } from '@/hooks/useUsageTracking';

type AppState = 'hero' | 'location' | 'swipe' | 'result';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [foodResult, setFoodResult] = useState<FoodRecommendation | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantRecommendation | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  
  const { canUse, remainingUses, incrementUsage, isAtLimit } = useUsageTracking();

  const handleStartSwipe = () => {
    if (!canUse && isAtLimit) {
      setShowPaywall(true);
      return;
    }
    
    // Check if we need location first
    navigator.geolocation.getCurrentPosition(
      () => {
        // Location permission granted, proceed
        setAppState('swipe');
        incrementUsage();
      },
      () => {
        // Location denied or unavailable, show location prompt
        setAppState('location');
        incrementUsage();
      },
      { timeout: 5000 }
    );
  };

  const handleLocationSet = () => {
    setHasLocation(true);
    setAppState('swipe');
  };

  const handleSwipeComplete = (result: FoodRecommendation, restaurantResult?: RestaurantRecommendation) => {
    setFoodResult(result);
    setRestaurant(restaurantResult || null);
    setAppState('result');
  };

  const handleRestart = () => {
    setFoodResult(null);
    setRestaurant(null);
    setAppState('hero');
  };

  return (
    <div className="min-h-screen">
      {appState === 'hero' && (
        <HeroSection onStartQuiz={handleStartSwipe} />
      )}
      
      {appState === 'location' && (
        <LocationPrompt onLocationSet={handleLocationSet} />
      )}
      
      {appState === 'swipe' && (
        <SwipeFlow onComplete={handleSwipeComplete} />
      )}
      
      {appState === 'result' && foodResult && (
        <FoodResult 
          result={foodResult} 
          restaurant={restaurant}
          onRestart={handleRestart}
        />
      )}

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        remainingUses={remainingUses}
      />
    </div>
  );
};

export default Index;
