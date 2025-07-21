import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Clock, Heart, Smartphone, Zap, DollarSign, CheckCircle } from 'lucide-react';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Hero */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              What Should We{' '}
              <span className="bg-gradient-romantic bg-clip-text text-transparent animate-wiggle">
                Eat?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              She says "I don't know" again? Answer 8–10 quick questions to find the perfect meal in under 2 minutes!
            </p>
          </div>

          {/* Hero Animation */}
          <div className="relative mx-auto max-w-2xl animate-bounce-in">
            <div className="relative w-80 h-80 mx-auto">
              {/* Floating Cards Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-40">
                  {/* Card 1 */}
                  <div className="absolute top-0 left-4 w-56 h-32 bg-gradient-romantic rounded-2xl shadow-warm transform rotate-12 animate-[float_3s_ease-in-out_infinite] flex items-center justify-center">
                    <span className="text-white text-2xl">🍕 Pizza?</span>
                  </div>
                  {/* Card 2 */}
                  <div className="absolute top-2 left-8 w-56 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-warm transform -rotate-6 animate-[float_3s_ease-in-out_infinite_0.5s] flex items-center justify-center">
                    <span className="text-white text-2xl">🍜 Ramen?</span>
                  </div>
                  {/* Card 3 */}
                  <div className="absolute top-4 left-12 w-56 h-32 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-warm transform rotate-3 animate-[float_3s_ease-in-out_infinite_1s] flex items-center justify-center">
                    <span className="text-white text-2xl">🍣 Sushi?</span>
                  </div>
                </div>
              </div>
              {/* Swipe Indicators */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 animate-pulse">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-2xl">👈</span>
                </div>
              </div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 animate-pulse">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-2xl">👉</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-in mt-12">
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="text-2xl px-16 py-8 bg-gradient-romantic hover:opacity-90 text-white shadow-warm transform hover:scale-105 transition-all duration-200 rounded-2xl font-bold"
            >
              Press to Start!
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            <Card className="border-0 shadow-soft hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-romantic rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Swipe to Decide</h3>
                <p className="text-muted-foreground">Tinder-style swiping makes food decisions fun and fast</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-romantic rounded-full flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Local Restaurants</h3>
                <p className="text-muted-foreground">Get nearby restaurant recommendations with directions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-romantic rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Perfect for Couples</h3>
                <p className="text-muted-foreground">End the "what do you want to eat" conversation forever</p>
              </CardContent>
            </Card>
          </div>


          {/* Testimonial */}
          <div className="mt-12 animate-fade-in">
            <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
              "No more asking 'what do you want to eat?' and getting 'I don't know.' This saves us so much time!" 
              <span className="block mt-2 text-sm font-medium text-foreground">- Happy couples everywhere</span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}