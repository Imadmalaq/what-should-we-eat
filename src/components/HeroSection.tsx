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

          {/* Modern Hero Visual */}
          <div className="relative mx-auto max-w-lg">
            <div className="relative">
              {/* Main illustration container */}
              <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Question mark icon with subtle animation */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="text-8xl mb-4 animate-pulse">🤔</div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Main text */}
                  <h2 className="text-3xl font-bold text-white mb-2">What should we eat?</h2>
                  <p className="text-white/80 text-lg mb-6">Let's find out together!</p>
                  
                  {/* Interactive food preview */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="group cursor-pointer">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                        <span className="text-2xl">🍕</span>
                      </div>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:-rotate-6">
                        <span className="text-2xl">🍜</span>
                      </div>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                        <span className="text-2xl">🍣</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button integrated */}
                  <Button
                    onClick={onStartQuiz}
                    size="lg"
                    className="w-full text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 shadow-lg transform hover:scale-105 transition-all duration-200 rounded-2xl font-bold border-0"
                  >
                    Press to Start
                  </Button>
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400/30 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-400/30 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
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