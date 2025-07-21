import { useState } from 'react';
import { UserLocation } from '@/types/app';
import { useToast } from '@/hooks/use-toast';

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Free reverse geocoding using Nominatim (OpenStreetMap)
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'WhatShouldWeEat/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      
      // Extract city name from the response
      const address = data.address;
      const city = address.city || address.town || address.village || address.municipality || 
                  address.county || address.state_district || 'Current Location';
      
      return city;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw error;
    }
  };

  // Forward geocoding using Nominatim
  const forwardGeocode = async (cityName: string): Promise<{ lat: number; lng: number; displayName: string }> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'WhatShouldWeEat/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Forward geocoding failed');
      }
      
      const data = await response.json();
      
      if (data.length === 0) {
        throw new Error('Location not found');
      }
      
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        displayName: result.display_name
      };
    } catch (error) {
      console.error('Forward geocoding error:', error);
      throw error;
    }
  };

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('Geolocation success:', position.coords);
        try {
          // Use Nominatim for reverse geocoding
          const cityName = await reverseGeocode(position.coords.latitude, position.coords.longitude);
          console.log('Reverse geocoded city:', cityName);

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: cityName,
            isManualInput: false
          });
          setLoading(false);
        } catch (err) {
          console.warn('Reverse geocoding failed:', err);
          // Still set location with coordinates even if city name fails
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Current Location',
            isManualInput: false
          });
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Location access was denied. Please enable location services and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  };

  const setManualLocation = async (cityName: string, postalCode?: string) => {
    if (!cityName.trim()) {
      setError('Please enter a valid city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use forward geocoding to get coordinates for the city
      const geocodeResult = await forwardGeocode(cityName.trim());
      
      setLocation({
        latitude: geocodeResult.lat,
        longitude: geocodeResult.lng,
        city: cityName.trim(),
        postalCode,
        isManualInput: true
      });
      
      console.log('Manual location set:', {
        city: cityName.trim(),
        coordinates: [geocodeResult.lat, geocodeResult.lng]
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Manual location geocoding failed:', err);
      setError('Could not find the specified location. Please check the spelling and try again.');
      setLoading(false);
    }
  };

  // Search for cities (autocomplete functionality)
  const searchCities = async (query: string): Promise<Array<{ name: string; displayName: string }>> => {
    if (query.length < 2) return [];

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&featuretype=city`,
        {
          headers: {
            'User-Agent': 'WhatShouldWeEat/1.0'
          }
        }
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        name: item.address?.city || item.address?.town || item.address?.village || item.name,
        displayName: item.display_name
      })).filter((item: any) => item.name);
    } catch (error) {
      console.error('City search error:', error);
      return [];
    }
  };

  return {
    location,
    loading,
    error,
    requestLocation,
    setManualLocation,
    searchCities
  };
}