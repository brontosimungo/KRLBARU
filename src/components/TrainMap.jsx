import React, { useEffect, useRef, useState } from 'react';
import stations from '../data/jadwal_ka_1737.json';
import { Loader } from '@googlemaps/js-api-loader';
import { getTrainPosition } from '../utils/time';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBgvf-fR-NOb3hht7I4TIyBZmKPqZfpnzs'; // Ganti dengan API key asli

export default function TrainMap() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [trainMarker, setTrainMarker] = useState(null);

  useEffect(() => {
    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY, version: 'weekly' });

    loader.load().then(() => {
      const gmap = new google.maps.Map(mapRef.current, {
        center: { lat: -6.305, lng: 106.7 },
        zoom: 11,
      });

      const pathCoords = stations.map((s) => ({ lat: s.lat, lng: s.lng }));

      new google.maps.Polyline({
        path: pathCoords,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: gmap,
      });

      stations.forEach((s) => {
        new google.maps.Marker({
          position: { lat: s.lat, lng: s.lng },
          map: gmap,
          label: {
            text: s.station,
            fontSize: '10px',
            fontWeight: 'bold',
          },
          icon: {
            url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
            scaledSize: new google.maps.Size(20, 20),
          },
        });
      });

      const marker = new google.maps.Marker({
        map: gmap,
        icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/train.png',
      });
      setTrainMarker(marker);
      setMap(gmap);
    });
  }, []);

  useEffect(() => {
    if (!map || !trainMarker) return;
    const interval = setInterval(() => {
      const pos = getTrainPosition(stations);
      trainMarker.setPosition(pos);
    }, 5000);

    return () => clearInterval(interval);
  }, [map, trainMarker]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
}
