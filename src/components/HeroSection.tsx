import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Clock, Heart } from 'lucide-react';
import heroFood from '@/assets/hero-food.jpg';

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
              What Should I{' '}
              <span className="bg-gradient-food bg-clip-text text-transparent animate-wiggle">
                Eat?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Stop the endless food decisions! Take our quick quiz and discover your perfect meal in under 2 minutes.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-2xl animate-bounce-in">
            <img 
              src={heroFood} 
              alt="Delicious food spread" 
              className="w-full h-auto rounded-2xl shadow-warm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-in">
            <Button
              variant="food"
              size="xl"
              onClick={onStartQuiz}
              className="text-xl px-12 py-6 animate-pulse hover:animate-none"
            >
              <Utensils className="w-6 h-6 mr-3" />
              Start the Food Quiz!
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            <Card className="border-0 shadow-soft hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-food rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Quick & Easy</h3>
                <p className="text-muted-foreground">Get personalized meal suggestions in under 2 minutes</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-food rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Personalized</h3>
                <p className="text-muted-foreground">Tailored to your mood, budget, and dietary preferences</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-warm transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-gradient-food rounded-full flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Variety</h3>
                <p className="text-muted-foreground">From comfort food to international cuisine, we've got you covered</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial */}
          <div className="mt-12 animate-fade-in">
            <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
              "Finally! No more staring into the fridge wondering what to eat. This quiz actually gets me!" 
              <span className="block mt-2 text-sm font-medium text-foreground">- Every indecisive food lover</span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}