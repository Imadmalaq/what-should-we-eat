import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SwipeCard } from '@/components/SwipeCard';
import { Progress } from '@/components/ui/progress';
import { foodRecommendations } from '@/data/swipeData';
import { FoodRecommendation, SwipeQuestion, RestaurantRecommendation } from '@/types/app';
import { EnhancedAIQuestionService, calculateEnhancedRecommendation } from '@/services/enhancedAiService';
import { RestaurantService } from '@/services/restaurantService';
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
  
  const aiService = EnhancedAIQuestionService.getInstance();
  const restaurantService = RestaurantService.getInstance();
  const { location } = useLocation();
  const totalQuestions = 10;

  // Generate first question on mount
  useEffect(() => {
    const initializeQuiz = async () => {
      aiService.resetSession(); // Reset for new session
      setIsGeneratingQuestion(true);
      try {
        const firstQuestion = await aiService.generateNextQuestion({}, 0);
        setQuestions([firstQuestion]);
      } catch (error) {
        console.error('Error generating first question:', error);
        // Fallback to a default question
        setQuestions([{
          id: 'fallback_1',
          question: "What's your current mood?",
          emoji: "😊",
          optionA: { text: "Relaxed and cozy", emoji: "😌", category: "comfort" },
          optionB: { text: "Energetic and bold", emoji: "⚡", category: "adventurous" }
        }]);
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
    handleAnswer(question.optionA.category);
  };

  const handleSwipeRight = () => {
    handleAnswer(question.optionB.category);
  };

  const handleAnswer = async (category: string) => {
    const newAnswers = {
      ...answers,
      [question.id]: category
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate final recommendation using enhanced algorithm
      const foodType = calculateEnhancedRecommendation(newAnswers);
      const result = foodRecommendations[foodType] || foodRecommendations.surprise;
      
      // Get specific restaurant recommendation
      try {
        const restaurant = await restaurantService.findSpecificRestaurant(
          foodType,
          location || { latitude: 46.2044, longitude: 6.1432 }, // Default to Geneva center
          {
            priceLevel: newAnswers.budget ? 1 : newAnswers.splurge ? 3 : 2,
            transportMode: 'walking'
          }
        );
        onComplete(result, restaurant || undefined);
      } catch (error) {
        console.error('Error finding restaurant:', error);
        onComplete(result);
      }
    } else {
      // Generate next question based on current answers
      setIsGeneratingQuestion(true);
      try {
        const nextQuestion = await aiService.generateNextQuestion(newAnswers, currentQuestion + 1);
        setQuestions(prev => [...prev, nextQuestion]);
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setIsGeneratingQuestion(false);
        }, 200);
      } catch (error) {
        console.error('Error generating next question:', error);
        setIsGeneratingQuestion(false);
        // Fallback - just move to next with a generic question
        setCurrentQuestion(prev => prev + 1);
      }
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
            className="shadow-warm border-2 border-border/50"
          >
            <div className="grid grid-cols-2 h-full min-h-[200px]">
              {/* Left Option */}
              <div className="flex flex-col items-center justify-center p-4 bg-red-50/30 border-r border-border/30 rounded-l-lg">
                <div className="text-4xl mb-3">{question.optionA.emoji}</div>
                <p className="font-medium text-center text-sm leading-tight text-foreground">
                  {question.optionA.text}
                </p>
                <div className="mt-3 text-xs text-red-600 font-medium opacity-75">
                  ← Swipe left
                </div>
              </div>

              {/* Right Option */}
              <div className="flex flex-col items-center justify-center p-4 bg-green-50/30 rounded-r-lg">
                <div className="text-4xl mb-3">{question.optionB.emoji}</div>
                <p className="font-medium text-center text-sm leading-tight text-foreground">
                  {question.optionB.text}
                </p>
                <div className="mt-3 text-xs text-green-600 font-medium opacity-75">
                  Swipe right →
                </div>
              </div>
            </div>
          </SwipeCard>
        </div>

        {/* Swipe Instructions - Left and Right */}
        <div className="flex justify-between items-center px-8">
          <div className="text-center space-y-2 opacity-60">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-xs text-red-500 font-medium">Option A</div>
          </div>
          
          <div className="text-center space-y-2 opacity-60">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-xs text-green-500 font-medium">Option B</div>
          </div>
        </div>
      </div>
    </div>
  );
}