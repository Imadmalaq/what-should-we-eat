import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Clock, Heart } from 'lucide-react';
import heroFood from '@/assets/hero-food.jpg';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-lovely relative">
      <div className="absolute inset-0 bg-white/20"></div>
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Hero */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              What Should We{' '}
              <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent animate-wiggle">
                Eat?
              </span>
              <span className="text-3xl md:text-4xl block mt-2">💕</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
              She says "I don't know" again? 💭 Skip the back-and-forth and find the perfect meal for both of you in 2 minutes! ✨
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-2xl animate-bounce-in">
            <img 
              src={heroFood} 
              alt="Delicious food spread" 
              className="w-full h-auto rounded-3xl shadow-lovely border-4 border-white/30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-3xl"></div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-in">
            <Button
              variant="default"
              size="lg"
              onClick={onStartQuiz}
              className="text-xl px-12 py-6 bg-white text-primary hover:bg-pink-50 border-0 rounded-full shadow-lovely transform hover:scale-105 transition-all duration-300"
            >
              <Utensils className="w-6 h-6 mr-3" />
              Start the Love Quiz! 💖
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            <Card className="border-0 shadow-lovely hover:shadow-warm transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-lovely rounded-full flex items-center justify-center shadow-soft">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Quick & Easy</h3>
                <p className="text-muted-foreground">Get personalized meal suggestions in under 2 minutes ⏰</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lovely hover:shadow-warm transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-lovely rounded-full flex items-center justify-center shadow-soft">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Made with Love</h3>
                <p className="text-muted-foreground">Tailored to your mood, budget, and relationship goals 💕</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lovely hover:shadow-warm transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-lovely rounded-full flex items-center justify-center shadow-soft">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Endless Variety</h3>
                <p className="text-muted-foreground">From comfort food to romantic dinners, we've got you covered 🍽️</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial */}
          <div className="mt-12 animate-fade-in">
            <blockquote className="text-lg italic text-white/90 max-w-2xl mx-auto bg-white/20 p-6 rounded-2xl backdrop-blur-sm shadow-lovely">
              "No more asking 'what do you want to eat?' and getting 'I don't know.' This saves us so much time! 💕" 
              <span className="block mt-2 text-sm font-medium text-white">- Happy couples everywhere 👫</span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}