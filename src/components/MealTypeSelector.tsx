import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  Coffee, 
  IceCream, 
  Cookie, 
  Martini,
  Sun
} from 'lucide-react';

export type MealType = 'full-meal' | 'breakfast' | 'dessert' | 'snacks' | 'ice-cream' | 'drinks';

interface MealTypeSelectorProps {
  onMealTypeSelected: (mealType: MealType) => void;
}

const mealTypes = [
  {
    id: 'full-meal' as MealType,
    title: 'Full Meal',
    description: 'Lunch or dinner',
    icon: UtensilsCrossed,
    emoji: '🍽️'
  },
  {
    id: 'breakfast' as MealType,
    title: 'Breakfast',
    description: 'Morning fuel',
    icon: Sun,
    emoji: '🥐'
  },
  {
    id: 'dessert' as MealType,
    title: 'Dessert',
    description: 'Sweet treats',
    icon: IceCream,
    emoji: '🍰'
  },
  {
    id: 'snacks' as MealType,
    title: 'Snacks',
    description: 'Small bites',
    icon: Cookie,
    emoji: '🥨'
  },
  {
    id: 'ice-cream' as MealType,
    title: 'Ice Cream',
    description: 'Frozen treats',
    icon: IceCream,
    emoji: '🍦'
  },
  {
    id: 'drinks' as MealType,
    title: 'Drinks',
    description: 'Café or bar',
    icon: Martini,
    emoji: '☕'
  }
];

export function MealTypeSelector({ onMealTypeSelected }: MealTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl shadow-warm">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <CardTitle className="text-3xl">What are you looking for?</CardTitle>
          <p className="text-muted-foreground text-lg">
            Choose what type of food experience you want
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {mealTypes.map((mealType) => {
              const Icon = mealType.icon;
              return (
                <Button
                  key={mealType.id}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
                  onClick={() => onMealTypeSelected(mealType.id)}
                >
                  <div className="text-4xl">{mealType.emoji}</div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{mealType.title}</div>
                    <div className="text-sm text-muted-foreground">{mealType.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}