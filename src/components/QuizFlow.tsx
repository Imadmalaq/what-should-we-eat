import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { Progress } from '@/components/ui/progress';
import { quizQuestions, calculateQuizResult } from '@/data/quizData';
import { QuizAnswers, QuizResult } from '@/types/quiz';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizFlowProps {
  onComplete: (result: QuizResult) => void;
}

export function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setAnswers(prev => ({
      ...prev,
      [question.id]: optionId
    }));
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (isLastQuestion) {
      const result = calculateQuizResult(answers);
      onComplete(result);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(answers[quizQuestions[currentQuestion + 1]?.id] || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[quizQuestions[currentQuestion - 1]?.id] || '');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="text-center space-y-4 animate-slide-in">
        <div className="text-6xl">{question.emoji}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid gap-4 animate-fade-in">
        {question.options.map((option, index) => (
          <QuizCard
            key={option.id}
            selected={selectedOption === option.id}
            onClick={() => handleOptionSelect(option.id)}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-lg font-medium">{option.text}</span>
            </div>
          </QuizCard>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="food"
          onClick={handleNext}
          disabled={!selectedOption}
          className="flex items-center gap-2"
        >
          {isLastQuestion ? 'Get My Recommendation!' : 'Next'}
          {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}