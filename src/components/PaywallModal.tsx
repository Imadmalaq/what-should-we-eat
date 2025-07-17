import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Crown, Heart, Zap, Star } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  remainingUses: number;
}

export function PaywallModal({ isOpen, onClose, remainingUses }: PaywallModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    // In production, this would integrate with Stripe
    // For MVP, we'll just show a coming soon message
    alert('Payments coming soon! For now, enjoy unlimited access.');
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-warm animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="w-16 h-16 mx-auto bg-gradient-romantic rounded-full flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl">
            You've used {5 - remainingUses} free decisions!
          </CardTitle>
          
          <p className="text-muted-foreground">
            Upgrade to unlimited food decisions for you and your partner
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Pricing */}
          <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="text-muted-foreground">/month</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Popular
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Unlimited decisions for endless date nights
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Unlimited food decisions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Save favorite results</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Priority restaurant recommendations</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full bg-gradient-romantic hover:opacity-90"
              size="lg"
            >
              {isLoading ? 'Processing...' : 'Upgrade to Unlimited'}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Cancel anytime. No hidden fees.
            </p>
          </div>

          {remainingUses > 0 && (
            <div className="text-center">
              <Button variant="ghost" onClick={onClose} className="text-sm">
                Use {remainingUses} remaining free decision{remainingUses !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}