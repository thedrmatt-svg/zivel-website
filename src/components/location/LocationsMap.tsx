'use client';

import { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapCenter = { lat: 36.5, lng: -96.0 };

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  ],
};

interface MapLocation {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  href: string;
  bookingId?: number;
}

export default function LocationsMap({ locations }: { locations: MapLocation[] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [activeMarker, setActiveMarker] = useState<MapLocation | null>(null);

  if (!isLoaded) {
    return (
      <div className="h-[500px] md:h-[600px] flex items-center justify-center bg-black/5 rounded-xl text-black/40">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden shadow-lg border border-black/10">
      <GoogleMap
        zoom={4}
        center={mapCenter}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={mapOptions}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setActiveMarker(loc)}
          />
        ))}

        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-3 max-w-xs text-base">
              <h3 className="font-bold text-xl mb-2 text-black">{activeMarker.name}</h3>
              <p className="mb-1 text-gray-700">{activeMarker.address}</p>
              <p className="mb-2 text-gray-700">Phone: {activeMarker.phone}</p>
              <div className="flex gap-2 mt-3">
                {activeMarker.bookingId ? (
                  <a
                    href={`https://zivel.myperformanceiq.com/book-appointment?set_location=${activeMarker.bookingId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#D4AF37] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b8942f] transition-colors"
                  >
                    Book Now
                  </a>
                ) : null}
                <a
                  href={activeMarker.href}
                  className="inline-block border border-[#D4AF37] text-[#D4AF37] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                  View Location
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
