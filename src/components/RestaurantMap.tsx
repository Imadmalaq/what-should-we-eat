import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface RestaurantMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

export function RestaurantMap({ lat, lng, name, address }: RestaurantMapProps) {
  const center = {
    lat,
    lng
  };

  const apiKey = import.meta.env.VITE_GMAPS_KEY;

  if (!apiKey) {
    // Fallback to iframe if no API key
    const encodedQuery = encodeURIComponent(`${name}, ${address}`);
    return (
      <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-soft">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}&zoom=15`}
          title={`Map showing ${name}`}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-soft">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker
            position={center}
            title={name}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}