import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuizResult } from '@/types/quiz';
import { Share2, RotateCcw, ChefHat } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ResultPageProps {
  result: QuizResult;
  onRestart: () => void;
}

export function ResultPage({ result, restaurant, onRestart }: ResultPageProps) {
  const handleShare = () => {
    const shareText = `I just discovered I should eat: ${result.title} 🍽️\n\nTry the "What Should I Eat?" quiz to find your perfect meal!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'What Should I Eat? - My Result',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your result with friends",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Result Header */}
      <div className="text-center space-y-6 animate-bounce-in">
        <div className="text-8xl animate-wiggle">{result.emoji}</div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {result.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {result.description}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <Card className="animate-fade-in">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <ChefHat className="w-5 h-5 text-primary" />
              Perfect meal ideas for you:
            </div>
            <div className="grid gap-3">
              {result.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl">•</span>
                  <span className="text-foreground">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
        <Button
          variant="food"
          size="lg"
          onClick={handleShare}
          className="flex-1 flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share My Result
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onRestart}
          className="flex-1 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Take Quiz Again
        </Button>
      </div>

      {/* Fun Footer */}
      <div className="text-center text-sm text-muted-foreground animate-fade-in">
        <p>Bon appétit! 🍽️</p>
        <p className="mt-2">Hungry for more? Take the quiz again for fresh ideas!</p>
      </div>
    </div>
  );
}