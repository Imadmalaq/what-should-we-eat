export async function reverseGeocodeCity(lat: number, lng: number): Promise<string> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GMAPS_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    
    if (json.status === 'OK' && json.results && json.results.length > 0) {
      // Try to find locality (city) component
      const cityComponent = json.results[0].address_components.find((component: any) =>
        component.types.includes('locality')
      );
      
      if (cityComponent) {
        return cityComponent.long_name;
      }
      
      // Fallback to administrative_area_level_1 (state/region)
      const stateComponent = json.results[0].address_components.find((component: any) =>
        component.types.includes('administrative_area_level_1')
      );
      
      if (stateComponent) {
        return stateComponent.long_name;
      }
    }
    
    throw new Error('Could not determine city from coordinates');
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    throw error;
  }
}

export async function getCoordsFromAddress(address: string): Promise<{ lat: number; lng: number }> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GMAPS_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    
    if (json.status === 'OK' && json.results && json.results.length > 0) {
      const location = json.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }
    
    throw new Error('Could not geocode address');
  } catch (error) {
    console.error('Geocoding failed:', error);
    throw error;
  }
}