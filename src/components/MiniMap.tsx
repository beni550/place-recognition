import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, ExternalLink } from 'lucide-react';

interface MiniMapProps {
  coordinates: { lat: number; lng: number };
  placeName: string;
  address: string;
}

export function MiniMap({ coordinates, placeName, address }: MiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyBmMjRhvW8QqQqQqQqQqQqQqQqQqQqQqQq', // Replace with actual API key
          version: 'weekly'
        });

        await loader.load();

        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'simplified' }]
            }
          ]
        });

        new google.maps.Marker({
          position: coordinates,
          map: map,
          title: placeName
        });

        setIsLoaded(true);
      } catch (err) {
        setError(true);
      }
    };

    initMap();
  }, [coordinates, placeName]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (error) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 text-sm">לא ניתן לטעון מפה</p>
        <button
          onClick={openInGoogleMaps}
          className="mt-2 text-teal-600 hover:text-teal-700 text-sm flex items-center gap-1 mx-auto"
        >
          <ExternalLink className="w-4 h-4" />
          פתח בגוגל מפות
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">מיקום</h3>
        <button
          onClick={openInGoogleMaps}
          className="text-teal-600 hover:text-teal-700 text-sm flex items-center gap-1 transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          פתח בגוגל מפות
        </button>
      </div>
      
      <div 
        ref={mapRef} 
        className={`w-full h-48 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md ${
          !isLoaded ? 'bg-gray-100 animate-pulse' : ''
        }`}
        onClick={openInGoogleMaps}
      />
      
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{address}</span>
      </div>
    </div>
  );
}