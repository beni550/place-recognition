import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Search } from 'lucide-react';

interface MapSelectorProps {
  onLocationSelect: (location: { address: string; coordinates: { lat: number; lng: number } }) => void;
  initialLocation?: string;
  initialCoordinates?: { lat: number; lng: number };
}

export function MapSelector({ onLocationSelect, initialLocation, initialCoordinates }: MapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchInput, setSearchInput] = useState(initialLocation || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyBmMjRhvW8QqQqQqQqQqQqQqQqQqQqQqQq', // Replace with actual API key
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();

        if (!mapRef.current) return;

        const defaultCenter = initialCoordinates || { lat: 32.0853, lng: 34.7818 }; // Tel Aviv
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 13,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        const markerInstance = new google.maps.Marker({
          position: defaultCenter,
          map: mapInstance,
          draggable: true,
          title: 'בחר מיקום'
        });

        // Handle marker drag
        markerInstance.addListener('dragend', () => {
          const position = markerInstance.getPosition();
          if (position) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: position }, (results, status) => {
              if (status === 'OK' && results?.[0]) {
                const address = results[0].formatted_address;
                setSearchInput(address);
                onLocationSelect({
                  address,
                  coordinates: { lat: position.lat(), lng: position.lng() }
                });
              }
            });
          }
        });

        // Handle map click
        mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            markerInstance.setPosition(event.latLng);
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: event.latLng }, (results, status) => {
              if (status === 'OK' && results?.[0]) {
                const address = results[0].formatted_address;
                setSearchInput(address);
                onLocationSelect({
                  address,
                  coordinates: { lat: event.latLng!.lat(), lng: event.latLng!.lng() }
                });
              }
            });
          }
        });

        setMap(mapInstance);
        setMarker(markerInstance);
        setIsLoading(false);
      } catch (err) {
        setError('שגיאה בטעינת המפה');
        setIsLoading(false);
      }
    };

    initMap();
  }, []);

  const handleSearch = () => {
    if (!map || !marker || !searchInput.trim()) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const location = results[0].geometry.location;
        const address = results[0].formatted_address;
        
        map.setCenter(location);
        marker.setPosition(location);
        
        onLocationSelect({
          address,
          coordinates: { lat: location.lat(), lng: location.lng() }
        });
      } else {
        setError('לא נמצא מיקום מתאים');
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
          <p className="text-gray-600">טוען מפה...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
        <div className="text-center text-red-600">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="חפש כתובת או שם מקום..."
          className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-right"
          dir="rtl"
        />
        <button
          onClick={handleSearch}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors duration-200"
        >
          חפש
        </button>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-64 rounded-lg border border-gray-200 shadow-sm"
      />
      
      <p className="text-sm text-gray-600 text-center">
        לחץ על המפה או גרור את הסמן לבחירת מיקום מדויק
      </p>
    </div>
  );
}