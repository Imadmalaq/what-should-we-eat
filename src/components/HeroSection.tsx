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
          <div className="relative mx-auto max-w-4xl">
            <div className="relative w-96 h-96 mx-auto flex items-center justify-center">
              {/* Central food showcase with gentle rotation */}
              <div className="relative w-80 h-80">
                {/* Center circle with button */}
                <div className="absolute inset-0 bg-gradient-romantic rounded-full shadow-warm flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-3 animate-pulse">🍽️</div>
                    <p className="text-xl font-semibold mb-4">What to eat?</p>
                    <Button
                      onClick={onStartQuiz}
                      size="lg"
                      className="text-lg px-8 py-4 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-200 rounded-xl font-bold"
                    >
                      Press to Start!
                    </Button>
                  </div>
                </div>
                
                {/* Orbiting food items */}
                <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg">
                    <span className="text-3xl">🍕</span>
                  </div>
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg">
                    <span className="text-3xl">🍜</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg">
                    <span className="text-3xl">🍣</span>
                  </div>
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg">
                    <span className="text-3xl">🥗</span>
                  </div>
                  <div className="absolute top-8 right-8 bg-white rounded-full p-3 shadow-lg">
                    <span className="text-2xl">🍰</span>
                  </div>
                  <div className="absolute bottom-8 right-8 bg-white rounded-full p-3 shadow-lg">
                    <span className="text-2xl">🌮</span>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-white rounded-full p-3 shadow-lg">
                    <span className="text-2xl">🍔</span>
                  </div>
                  <div className="absolute top-8 left-8 bg-white rounded-full p-3 shadow-lg">
                    <span className="text-2xl">🥪</span>
                  </div>
                </div>
              </div>
            </div>
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