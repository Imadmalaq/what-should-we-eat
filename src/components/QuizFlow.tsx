// This component is disabled in the public repo
// The main app uses SwipeFlow instead

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuizFlowProps {
  onComplete: (result: any) => void;
}

export function QuizFlow({ onComplete }: QuizFlowProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Mode Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          This feature is part of our premium experience. Try our swipe mode instead!
        </p>
        <Button onClick={() => window.location.reload()}>
          Back to Swipe Mode
        </Button>
      </Card>
    </div>
  );
}