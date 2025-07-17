import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SwipeFlow } from '@/components/SwipeFlow';
import { FoodResult } from '@/components/FoodResult';
import { LocationPrompt } from '@/components/LocationPrompt';
import { PaywallModal } from '@/components/PaywallModal';
import { FoodRecommendation } from '@/types/app';
import { useUsageTracking } from '@/hooks/useUsageTracking';

type AppState = 'hero' | 'location' | 'swipe' | 'result';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [foodResult, setFoodResult] = useState<FoodRecommendation | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  
  const { canUse, remainingUses, incrementUsage, isAtLimit } = useUsageTracking();

  const handleStartSwipe = () => {
    if (!canUse && isAtLimit) {
      setShowPaywall(true);
      return;
    }
    
    // For MVP, skip location for now
    setAppState('swipe');
    incrementUsage();
  };

  const handleLocationSet = () => {
    setHasLocation(true);
    setAppState('swipe');
  };

  const handleSwipeComplete = (result: FoodRecommendation) => {
    setFoodResult(result);
    setAppState('result');
  };

  const handleRestart = () => {
    setFoodResult(null);
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
