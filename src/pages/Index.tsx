import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SwipeFlow } from '@/components/SwipeFlow';
import { FoodResult } from '@/components/FoodResult';
import { LocationPrompt } from '@/components/LocationPrompt';
import { MealTypeSelector, MealType } from '@/components/MealTypeSelector';
import { PaywallModal } from '@/components/PaywallModal';
import { FoodRecommendation, RestaurantRecommendation } from '@/types/app';
import { useUsageTracking } from '@/hooks/useUsageTracking';

type AppState = 'hero' | 'location' | 'meal-type' | 'swipe' | 'result';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [foodResult, setFoodResult] = useState<FoodRecommendation | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantRecommendation | null>(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);

  const handleStartSwipe = () => {
    // Start with meal type selection
    setAppState('meal-type');
  };

  const handleMealTypeSelected = (mealType: MealType) => {
    setSelectedMealType(mealType);
    // Check if we need location first
    navigator.geolocation.getCurrentPosition(
      () => {
        // Location permission granted, proceed to quiz
        setAppState('swipe');
      },
      () => {
        // Location denied or unavailable, show location prompt
        setAppState('location');
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
    setSelectedMealType(null);
    setAppState('hero');
  };

  return (
    <div className="min-h-screen">
      {appState === 'hero' && (
        <HeroSection onStartQuiz={handleStartSwipe} />
      )}
      
      {appState === 'meal-type' && (
        <MealTypeSelector onMealTypeSelected={handleMealTypeSelected} />
      )}

      {appState === 'location' && (
        <LocationPrompt onLocationSet={handleLocationSet} />
      )}
      
      {appState === 'swipe' && selectedMealType && (
        <SwipeFlow 
          onComplete={handleSwipeComplete} 
          mealType={selectedMealType}
        />
      )}
      
      {appState === 'result' && foodResult && (
        <FoodResult 
          result={foodResult} 
          restaurant={restaurant}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
