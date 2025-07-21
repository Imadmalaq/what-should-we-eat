import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RestaurantMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export function RestaurantMap({ lat, lng, name, address }: RestaurantMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    // Check if token is stored
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
      setShowTokenInput(false);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || showTokenInput) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom: 15,
        pitch: 0,
      });

      // Add marker for restaurant
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${name}</strong><br>${address}`))
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    } catch (error) {
      console.error('Error initializing map:', error);
      setShowTokenInput(true);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [lat, lng, name, address, mapboxToken, showTokenInput]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Map Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            To display the restaurant map, please enter your Mapbox public token.
            <br />
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get your free token at mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
              Show Map
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-soft">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}