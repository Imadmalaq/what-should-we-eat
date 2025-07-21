import { FoodRecommendation, RestaurantRecommendation } from '@/types/app';
import { FoodResult } from './FoodResult';

interface ResultPageProps {
  result: FoodRecommendation;
  onRestart: () => void;
}

export function ResultPage({ result, onRestart }: ResultPageProps) {
  return (
    <div className="min-h-screen bg-gradient-warm px-4 py-8">
      <div className="max-w-md mx-auto">
        <FoodResult result={result} onRestart={onRestart} />
      </div>
    </div>
  );
}