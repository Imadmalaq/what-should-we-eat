import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SwipeCard } from '@/components/SwipeCard';
import { Progress } from '@/components/ui/progress';
import { foodRecommendations } from '@/data/swipeData';
import { FoodRecommendation, SwipeQuestion } from '@/types/app';
import { calculateEnhancedRecommendation } from '@/services/enhancedAiService';
import { AIQuestionService } from '@/services/aiQuestionService';
import { AIRecommendationService } from '@/services/aiRecommendationService';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { MealType } from '@/components/MealTypeSelector';
import { Heart, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface SwipeFlowProps {
  onComplete: (result: FoodRecommendation) => void;
  mealType: MealType;
}

export function SwipeFlow({ onComplete, mealType }: SwipeFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questions, setQuestions] = useState<SwipeQuestion[]>([]);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [useAI, setUseAI] = useState(true);
  
  const aiService = AIQuestionService.getInstance();
  const aiRecommendationService = AIRecommendationService.getInstance();
  const totalQuestions = 8;

  const handleApiKeySet = (apiKey: string) => {
    aiService.setApiKey(apiKey);
    setUseAI(true);
    setShowApiKeyInput(false);
    initializeQuiz();
  };

  const handleSkipApiKey = () => {
    setUseAI(false);
    setShowApiKeyInput(false);
    initializeQuiz();
  };

  // Generate first question on component setup
  useEffect(() => {
    initializeQuiz();
  }, []);

  const initializeQuiz = async () => {
    aiService.resetSession();
    setIsGeneratingQuestion(true);
    try {
      const firstQuestion = await aiService.generateQuestion({
        mealType,
        previousAnswers: [],
        questionCount: 0,
        totalQuestions
      });
      setQuestions([firstQuestion]);
    } catch (error) {
      console.error('Error generating first question:', error);
      // Fallback to a default question based on meal type
      const fallbackQuestion = getMealTypeSpecificQuestion(mealType);
      setQuestions([fallbackQuestion]);
    }
    setIsGeneratingQuestion(false);
  };

  if (showApiKeyInput) {
    return <ApiKeyInput onApiKeySet={handleApiKeySet} onSkip={handleSkipApiKey} />;
  }

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
      [question.id]: category,
      mealType // Include meal type in answers for recommendation algorithm
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate final recommendation using enhanced algorithm with meal type
      const foodType = calculateEnhancedRecommendation(newAnswers, mealType);
      const baseResult = foodRecommendations[foodType] || foodRecommendations.surprise;
      
      // Get AI-enhanced recommendation
      try {
        const enhancedResult = await aiRecommendationService.getEnhancedRecommendation(
          mealType,
          newAnswers,
          baseResult
        );
        onComplete(enhancedResult);
      } catch (error) {
        console.error('Failed to get AI recommendation:', error);
        onComplete(baseResult);
      }
    } else {
      // Generate next question based on current answers
      setIsGeneratingQuestion(true);
      try {
        const previousAnswers = Object.values(newAnswers);
        const nextQuestion = await aiService.generateQuestion({
          mealType,
          previousAnswers,
          questionCount: currentQuestion + 1,
          totalQuestions
        });
        setQuestions(prev => [...prev, nextQuestion]);
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setIsGeneratingQuestion(false);
        }, 200);
      } catch (error) {
        console.error('Error generating next question:', error);
        // End quiz early if we can't generate more questions
        handleQuizComplete();
      }
    }
  };

  // Helper function to complete the quiz
  const handleQuizComplete = async () => {
    console.log('Quiz complete with answers:', answers);
    // Calculate final recommendation using enhanced algorithm with meal type
    const foodType = calculateEnhancedRecommendation(answers, mealType);
    const baseResult = foodRecommendations[foodType] || foodRecommendations.surprise;
    
    // Get AI-enhanced recommendation
    try {
      const enhancedResult = await aiRecommendationService.getEnhancedRecommendation(
        mealType,
        answers,
        baseResult
      );
      onComplete(enhancedResult);
    } catch (error) {
      console.error('Failed to get AI recommendation:', error);
      onComplete(baseResult);
    }
  };

  // Helper function to get meal type specific fallback questions
  const getMealTypeSpecificQuestion = (mealType: MealType) => {
    const questionMap = {
      'full-meal': {
        id: 'fallback_meal',
        question: "What's your current mood for a meal?",
        emoji: "🍽️",
        optionA: { text: "Relaxed and cozy", emoji: "😌", category: "comfort" },
        optionB: { text: "Energetic and bold", emoji: "⚡", category: "adventurous" }
      },
      'breakfast': {
        id: 'fallback_breakfast',
        question: "How do you want to start your day?",
        emoji: "🌅",
        optionA: { text: "Light and healthy", emoji: "🥗", category: "healthy" },
        optionB: { text: "Hearty and filling", emoji: "🥞", category: "comfort" }
      },
      'dessert': {
        id: 'fallback_dessert',
        question: "What kind of sweet treat sounds good?",
        emoji: "🍰",
        optionA: { text: "Rich and indulgent", emoji: "🍫", category: "indulgent" },
        optionB: { text: "Light and refreshing", emoji: "🍓", category: "light" }
      },
      'snacks': {
        id: 'fallback_snacks',
        question: "What kind of snack are you craving?",
        emoji: "🥨",
        optionA: { text: "Crunchy and savory", emoji: "🥜", category: "savory" },
        optionB: { text: "Sweet and soft", emoji: "🍪", category: "sweet" }
      },
      'ice-cream': {
        id: 'fallback_icecream',
        question: "What frozen treat sounds perfect?",
        emoji: "🍦",
        optionA: { text: "Classic and creamy", emoji: "🍨", category: "classic" },
        optionB: { text: "Unique and adventurous", emoji: "🍧", category: "adventurous" }
      },
      'drinks': {
        id: 'fallback_drinks',
        question: "What's the vibe you're going for?",
        emoji: "☕",
        optionA: { text: "Cozy café atmosphere", emoji: "📚", category: "cozy" },
        optionB: { text: "Social bar scene", emoji: "🍸", category: "social" }
      }
    };
    
    return questionMap[mealType];
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
                <div className="text-4xl mb-3">{question.optionA.emoji}</div>
                <p className="font-medium text-center text-sm leading-tight text-foreground mb-3">
                  {question.optionA.text}
                </p>
                <div className="text-xs text-orange-600 font-medium opacity-70 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Swipe left
                </div>
              </div>

              {/* Right Option - Swipe Right */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-l from-green-50/40 to-transparent">
                <div className="text-4xl mb-3">{question.optionB.emoji}</div>
                <p className="font-medium text-center text-sm leading-tight text-foreground mb-3">
                  {question.optionB.text}
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