import React, { useState, useRef, useEffect } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css'

import sa4 from './sa4-full.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiYm93ZW5mYW4tdW5pbWVsYiIsImEiOiJjbGhic2s0NzUwdTd5M2VzMGdmbzI5c3l4In0.EYJYO7ZDEVXj7R-k-y2tSg';

function Mapbox(props) {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(133.8);
  const [lat, setLat] = useState(-25.3);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    let hoveredStateId = null;

    map.current.on('load', () => {
      map.current.addSource('sa4', {
        'type': 'geojson',
        'data': sa4,
        'generateId': true
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.current.addLayer({
        'id': 'sa4-fills',
        'type': 'fill',
        'source': 'sa4',
        'layout': {},
        'paint': {
          'fill-color': {
            property: props.propertyType,
            stops: [
              [props.max/6, '#91d7ff'],
              [props.max/6*2, '#146ec8'],
              [props.max/6*3, '#0051a7'],
              [props.max/6*4, '#ff9696'],
              [props.max/6*5, '#d7160a'],
              [props.max, '#b80000'],
            ]
          },
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
          ]
        }
      });

      map.current.addLayer({
        'id': 'sa4-borders',
        'type': 'line',
        'source': 'sa4',
        'layout': {},
        'paint': {
          'line-color': '#627BC1',
          'line-width': 2
        }
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      // When the user moves their mouse over the state-fill layer
      map.current.on('mousemove', 'sa4-fills', (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: 'sa4', id: hoveredStateId },
              { hover: false }
            );
            map.current.getCanvas().style.cursor = 'pointer';
            popup.setLngLat(e.lngLat).setHTML(
              e.features[0].properties.SA4_NAME21 + '<br>' + props.valueName
              + ': ' + e.features[0].properties[props.propertyType]
            ).addTo(map.current);
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
            { source: 'sa4', id: hoveredStateId },
            { hover: true }
          );
        }
      });

      // When the mouse leaves the state-fill layer
      map.current.on('mouseleave', 'sa4-fills', () => {
        if (hoveredStateId !== null) {
          map.current.setFeatureState(
            { source: 'sa4', id: hoveredStateId },
            { hover: false }
          );
          map.current.getCanvas().style.cursor = '';
          popup.remove();
        }
        hoveredStateId = null;
      });
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );

}

export default Mapbox;
