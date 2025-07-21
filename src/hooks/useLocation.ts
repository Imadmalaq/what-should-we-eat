import { useState, useEffect } from 'react';
import { UserLocation } from '@/types/app';

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation success:', position.coords);
        // Reverse geocode the coordinates to get city name
        reverseGeocode(position.coords.latitude, position.coords.longitude)
          .then(cityName => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              city: cityName,
              isManualInput: false
            });
            setLoading(false);
          })
          .catch(err => {
            console.warn('Reverse geocoding failed, using coordinates only:', err);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              isManualInput: false
            });
            setLoading(false);
          });
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to get your location. Please enter your city manually.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // In production, this would use Google Geocoding API
      // For now, use our existing coordinate-to-city mapping
      const city = getCityFromCoordinates(lat, lng);
      if (city && city !== 'Your City') {
        return city;
      }
      throw new Error('Could not determine city from coordinates');
    } catch (error) {
      throw error;
    }
  };

  const getCityFromCoordinates = (lat: number, lng: number): string => {
    // Major cities by approximate coordinates (realistic ranges)
    if (lat >= 46.1 && lat <= 46.3 && lng >= 6.0 && lng <= 6.3) return 'Geneva';
    if (lat >= 47.3 && lat <= 47.4 && lng >= 8.5 && lng <= 8.6) return 'Zurich';
    if (lat >= 46.9 && lat <= 47.0 && lng >= 7.4 && lng <= 7.5) return 'Bern';
    if (lat >= 40.6 && lat <= 40.9 && lng >= -74.1 && lng <= -73.9) return 'New York';
    if (lat >= 51.4 && lat <= 51.6 && lng >= -0.2 && lng <= 0.1) return 'London';
    if (lat >= 48.8 && lat <= 48.9 && lng >= 2.2 && lng <= 2.5) return 'Paris';
    if (lat >= 34.0 && lat <= 34.1 && lng >= -118.5 && lng <= -118.2) return 'Los Angeles';
    if (lat >= 37.7 && lat <= 37.8 && lng >= -122.5 && lng <= -122.4) return 'San Francisco';
    if (lat >= 35.6 && lat <= 35.7 && lng >= 139.6 && lng <= 139.8) return 'Tokyo';
    if (lat >= 52.4 && lat <= 52.6 && lng >= 13.3 && lng <= 13.5) return 'Berlin';
    if (lat >= 41.8 && lat <= 42.0 && lng >= 12.4 && lng <= 12.6) return 'Rome';
    if (lat >= 55.7 && lat <= 55.8 && lng >= 37.5 && lng <= 37.7) return 'Moscow';
    
    // Fallback based on general regions
    if (lat >= 45 && lat <= 48 && lng >= 6 && lng <= 10) return 'Swiss City';
    if (lat >= 40 && lat <= 50 && lng >= -10 && lng <= 10) return 'European City';
    if (lat >= 25 && lat <= 50 && lng >= -130 && lng <= -60) return 'American City';
    if (lat >= 30 && lat <= 45 && lng >= 120 && lng <= 150) return 'Asian City';
    
    return 'Your City';
  };

  const setManualLocation = (city: string, postalCode?: string) => {
    // Clear any previous errors and set manual location with priority flag
    setError(null);
    setLocation({
      latitude: 0,
      longitude: 0,
      city: city.trim(),
      postalCode,
      isManualInput: true // Flag to indicate this is manual input
    });
  };

  return {
    location,
    loading,
    error,
    requestLocation,
    setManualLocation
  };
}