import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  style?: React.CSSProperties;
}

export function QuizCard({ children, className, onClick, selected, style }: QuizCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-soft transform hover:scale-102",
        selected && "border-primary shadow-warm scale-102",
        className
      )}
      onClick={onClick}
      style={style}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}