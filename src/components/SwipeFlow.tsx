import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SwipeCard } from '@/components/SwipeCard';
import { Progress } from '@/components/ui/progress';
import { FoodRecommendation, SwipeQuestion, RestaurantRecommendation } from '@/types/app';
import { PublicAPIClient } from '@/services/api';
import { FallbackService } from '@/services/fallbackService';
import { useLocation } from '@/hooks/useLocation';
import { Heart, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface SwipeFlowProps {
  onComplete: (result: FoodRecommendation, restaurant?: RestaurantRecommendation) => void;
}

export function SwipeFlow({ onComplete }: SwipeFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questions, setQuestions] = useState<SwipeQuestion[]>([]);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  
  const { location } = useLocation();
  const totalQuestions = 3; // Simplified for public demo

  // Generate first question on mount
  useEffect(() => {
    const initializeQuiz = async () => {
      setIsGeneratingQuestion(true);
      try {
        const response = await PublicAPIClient.generateQuestion({}, 0);
        if (response.success && response.data) {
          setQuestions([response.data]);
        } else {
          // Use fallback questions
          setQuestions(FallbackService.getFallbackQuestions().slice(0, 1));
        }
      } catch (error) {
        console.error('Error generating first question:', error);
        // Use fallback questions
        setQuestions(FallbackService.getFallbackQuestions().slice(0, 1));
      }
      setIsGeneratingQuestion(false);
    };
    
    initializeQuiz();
  }, []);

  if (questions.length === 0 || isGeneratingQuestion) {
    return <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🤔</div>
        <div>Generating your personalized questions...</div>
      </div>
    </div>;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestion >= totalQuestions - 1;

  const handleSwipeLeft = () => {
    handleAnswer(question.leftCategory);
  };

  const handleSwipeRight = () => {
    handleAnswer(question.rightCategory);
  };

  const handleAnswer = async (category: string) => {
    const newAnswers = {
      ...answers,
      [question.id]: category
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate final recommendation using API
      setIsGeneratingQuestion(true);
      try {
        const response = await PublicAPIClient.getFoodRecommendation(newAnswers);
        
        if (response.success && response.data) {
          const result: FoodRecommendation = response.data;

          // Try to find a restaurant if location is available
          let restaurant: RestaurantRecommendation | undefined;
          if (location.latitude && location.longitude) {
            const restaurantResponse = await PublicAPIClient.findRestaurant(
              result.cuisine,
              location,
              { priceLevel: 2, maxDistance: 10 }
            );
            
            if (restaurantResponse.success && restaurantResponse.data) {
              restaurant = restaurantResponse.data;
            }
          }

          onComplete(result, restaurant);
        } else {
          // Use fallback recommendation
          const fallbackResult: FoodRecommendation = {
            name: FallbackService.getBasicRecommendation(newAnswers),
            description: "Based on your preferences, here's what we recommend!",
            cuisine: 'Various',
            matchPercentage: 80
          };
          onComplete(fallbackResult);
        }
      } catch (error) {
        console.error('Error generating recommendation:', error);
        // Use fallback recommendation
        const fallbackResult: FoodRecommendation = {
          name: FallbackService.getBasicRecommendation(newAnswers),
          description: "We're sure you'll find something amazing to eat!",
          cuisine: 'Various',
          matchPercentage: 75
        };
        onComplete(fallbackResult);
      }
      setIsGeneratingQuestion(false);
    } else {
      // Generate next question
      setIsGeneratingQuestion(true);
      try {
        const response = await PublicAPIClient.generateQuestion(newAnswers, currentQuestion + 1);
        
        if (response.success && response.data) {
          setQuestions(prev => [...prev, response.data]);
          setTimeout(() => {
            setCurrentQuestion(prev => prev + 1);
            setIsGeneratingQuestion(false);
          }, 200);
        } else {
          // Use fallback questions
          const fallbackQuestions = FallbackService.getFallbackQuestions();
          const nextIndex = currentQuestion + 1;
          if (nextIndex < fallbackQuestions.length) {
            setQuestions(prev => [...prev, fallbackQuestions[nextIndex]]);
            setTimeout(() => {
              setCurrentQuestion(prev => prev + 1);
              setIsGeneratingQuestion(false);
            }, 200);
          } else {
            // No more questions, provide recommendation
            const fallbackResult: FoodRecommendation = {
              name: FallbackService.getBasicRecommendation(newAnswers),
              description: "Based on your preferences so far, here's what we recommend!",
              cuisine: 'Various',
              matchPercentage: 75
            };
            onComplete(fallbackResult);
          }
        }
      } catch (error) {
        console.error('Error generating next question:', error);
        // Use fallback questions
        const fallbackQuestions = FallbackService.getFallbackQuestions();
        const nextIndex = currentQuestion + 1;
        if (nextIndex < fallbackQuestions.length) {
          setQuestions(prev => [...prev, fallbackQuestions[nextIndex]]);
          setTimeout(() => {
            setCurrentQuestion(prev => prev + 1);
            setIsGeneratingQuestion(false);
          }, 200);
        } else {
          // Provide recommendation with current data
          const fallbackResult: FoodRecommendation = {
            name: FallbackService.getBasicRecommendation(newAnswers),
            description: "Based on your preferences so far, here's what we recommend!",
            cuisine: 'Various',
            matchPercentage: 75
          };
          onComplete(fallbackResult);
        }
      }
      setIsGeneratingQuestion(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm px-4 py-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce-in">{question.emoji}</div>
          <h2 className="text-2xl font-bold text-foreground">
            {question.question}
          </h2>
          <p className="text-muted-foreground">
            Swipe left or right to choose
          </p>
        </div>

        {/* Swipe Card */}
        <div className="relative h-80 flex items-center justify-center">
          <SwipeCard
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            className="shadow-warm border-2 border-border/50 bg-card"
          >
            <div className="flex h-full min-h-[250px]">
              {/* Left Option - Swipe Left */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-r from-orange-50/40 to-transparent border-r border-border/20">
                <div className="text-4xl mb-3">{question.leftOption.emoji}</div>
                <p className="font-medium text-center text-sm leading-tight text-foreground mb-3">
                  {question.leftOption.text}
                </p>
                <div className="text-xs text-orange-600 font-medium opacity-70 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Swipe left
                </div>
              </div>

              {/* Right Option - Swipe Right */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-l from-green-50/40 to-transparent">
                <div className="text-4xl mb-3">{question.rightOption.emoji}</div>
                <p className="font-medium text-center text-sm leading-tight text-foreground mb-3">
                  {question.rightOption.text}
                </p>
                <div className="text-xs text-green-600 font-medium opacity-70 flex items-center gap-1">
                  Swipe right
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </SwipeCard>
        </div>
      </div>
    </div>
  );
}