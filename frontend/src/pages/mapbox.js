import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import Map from 'react-map-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiYm93ZW5mYW4tdW5pbWVsYiIsImEiOiJjbGhic2s0NzUwdTd5M2VzMGdmbzI5c3l4In0.EYJYO7ZDEVXj7R-k-y2tSg';

function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Mapbox;
