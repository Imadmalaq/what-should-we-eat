import { FoodRecommendation, RestaurantRecommendation } from '@/types/app';
import { FoodResult } from './FoodResult';

interface ResultPageProps {
  result: FoodRecommendation;
  restaurant?: RestaurantRecommendation;
  onRestart: () => void;
}

export function ResultPage({ result, restaurant, onRestart }: ResultPageProps) {
  return (
    <div className="min-h-screen bg-gradient-warm px-4 py-8">
      <div className="max-w-md mx-auto">
        <FoodResult result={result} restaurant={restaurant} onRestart={onRestart} />
      </div>
    </div>
  );
}