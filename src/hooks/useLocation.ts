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
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
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

  const setManualLocation = (city: string, postalCode?: string) => {
    // For MVP, we'll just store the city/postal code
    // In production, you'd geocode this to get lat/lng
    setLocation({
      latitude: 0,
      longitude: 0,
      city,
      postalCode
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