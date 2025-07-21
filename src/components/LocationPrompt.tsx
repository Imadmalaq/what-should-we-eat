import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2, Search } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';

interface LocationPromptProps {
  onLocationSet: () => void;
}

export function LocationPrompt({ onLocationSet }: LocationPromptProps) {
  const { location, loading, error, requestLocation, setManualLocation, searchCities } = useLocation();
  const [manualCity, setManualCity] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<Array<{ name: string; displayName: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Auto-advance when location is successfully set
  useEffect(() => {
    if (location && !error) {
      console.log('Location set successfully:', location);
      onLocationSet();
    }
  }, [location, error, onLocationSet]);

  // Handle city search with debouncing
  useEffect(() => {
    if (manualCity.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const suggestions = await searchCities(manualCity);
        setCitySuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } catch (error) {
        console.error('City search failed:', error);
        setCitySuggestions([]);
        setShowSuggestions(false);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [manualCity, searchCities]);

  const handleLocationRequest = async () => {
    await requestLocation();
  };

  const handleManualSubmit = async (cityName?: string) => {
    const city = cityName || manualCity;
    if (!city.trim()) return;

    await setManualLocation(city.trim());
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: { name: string; displayName: string }) => {
    setManualCity(suggestion.name);
    setShowSuggestions(false);
    handleManualSubmit(suggestion.name);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleManualSubmit();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Don't render if location is already set and there's no error
  if (location && !error) {
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
            <div className="space-y-4">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Enter your city name..."
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    className="pl-10"
                    disabled={loading}
                  />
                  {searchLoading && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                  )}
                </div>

                {/* City Suggestions Dropdown */}
                {showSuggestions && citySuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {citySuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{suggestion.name}</div>
                        <div className="text-sm text-gray-500 truncate">{suggestion.displayName}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleManualSubmit()}
                disabled={loading || !manualCity.trim()}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Finding location...
                  </>
                ) : (
                  'Confirm Location'
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowManualInput(false)}
                className="w-full"
                disabled={loading}
              >
                Back to GPS location
              </Button>

              {error && (
                <div className="text-center">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
            </div>
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