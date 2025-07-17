import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';

interface LocationPromptProps {
  onLocationSet: () => void;
}

export function LocationPrompt({ onLocationSet }: LocationPromptProps) {
  const { location, loading, error, requestLocation, setManualLocation } = useLocation();
  const [manualCity, setManualCity] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCity.trim()) {
      setManualLocation(manualCity.trim());
      onLocationSet();
    }
  };

  const handleLocationRequest = async () => {
    await requestLocation();
    if (!error) {
      onLocationSet();
    }
  };

  if (location && !error) {
    onLocationSet();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-warm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Find Restaurants Near You</CardTitle>
          <p className="text-muted-foreground">
            We'll show you the best local spots for your perfect meal
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showManualInput ? (
            <>
              <Button
                onClick={handleLocationRequest}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Getting your location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Use My Current Location
                  </>
                )}
              </Button>

              {error && (
                <div className="text-center">
                  <p className="text-sm text-destructive mb-2">{error}</p>
                </div>
              )}

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowManualInput(true)}
                  className="text-sm"
                >
                  Enter city manually instead
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your city"
                  value={manualCity}
                  onChange={(e) => setManualCity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowManualInput(false)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!manualCity.trim()}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </form>
          )}

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onLocationSet}
              className="text-sm text-muted-foreground"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}