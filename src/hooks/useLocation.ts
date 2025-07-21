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