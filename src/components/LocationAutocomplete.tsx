import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

interface LocationAutocompleteProps {
  onLocationSelect: (city: string) => void;
  placeholder?: string;
  className?: string;
}

interface LocationSuggestion {
  place_id: string;
  description: string;
  types: string[];
}

export function LocationAutocomplete({ onLocationSelect, placeholder = "Enter your city", className }: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Mock suggestions for common cities (fallback when no Google Places API)
  const mockSuggestions = [
    'New York, NY, USA',
    'London, UK',
    'Paris, France', 
    'Tokyo, Japan',
    'Sydney, Australia',
    'Toronto, Canada',
    'Berlin, Germany',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Rome, Italy'
  ];

  const fetchSuggestions = async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // For MVP, use mock suggestions filtered by input
    const filtered = mockSuggestions
      .filter(city => city.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5)
      .map((city, index) => ({
        place_id: `mock_${index}`,
        description: city,
        types: ['locality', 'political']
      }));
    
    setSuggestions(filtered);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);

    // Debounce the API call
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const cityName = suggestion.description.split(',')[0]; // Extract city name
    setInputValue(cityName);
    setShowSuggestions(false);
    onLocationSelect(cityName);
  };

  const handleManualSubmit = () => {
    if (inputValue.trim()) {
      onLocationSelect(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      } else {
        handleManualSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.location-autocomplete')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`location-autocomplete relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="w-full pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 z-50 bg-background border border-border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-muted-foreground">
              Searching locations...
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.place_id}
                className="w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors flex items-center gap-2 border-b border-border/50 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm">{suggestion.description}</span>
              </button>
            ))
          )}
        </div>
      )}

      {inputValue && !showSuggestions && (
        <Button
          onClick={handleManualSubmit}
          className="w-full mt-2"
          variant="outline"
        >
          Use "{inputValue}"
        </Button>
      )}
    </div>
  );
}