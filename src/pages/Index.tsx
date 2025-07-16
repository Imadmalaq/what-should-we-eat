import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { QuizFlow } from '@/components/QuizFlow';
import { ResultPage } from '@/components/ResultPage';
import { QuizResult } from '@/types/quiz';

type AppState = 'hero' | 'quiz' | 'result';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = () => {
    setAppState('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setAppState('result');
  };

  const handleRestart = () => {
    setQuizResult(null);
    setAppState('hero');
  };

  return (
    <div className="min-h-screen">
      {appState === 'hero' && (
        <HeroSection onStartQuiz={handleStartQuiz} />
      )}
      
      {appState === 'quiz' && (
        <div className="min-h-screen bg-gradient-warm py-12">
          <QuizFlow onComplete={handleQuizComplete} />
        </div>
      )}
      
      {appState === 'result' && quizResult && (
        <div className="min-h-screen bg-gradient-warm py-12">
          <ResultPage result={quizResult} onRestart={handleRestart} />
        </div>
      )}
    </div>
  );
};

export default Index;
