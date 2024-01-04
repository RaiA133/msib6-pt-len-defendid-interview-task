import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import ModalSetting from '../components/Map/ModalSetting';

/**
 * Page utama dari Map yang membungkus semua components.
 * @constructor
 */
const MapPage = () => {
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: zoom,
      }),
    });
    return () => { // Cleanup function to destroy the map when the component unmounts
      map.setTarget(null);
    };
  }, [zoom]); // Re-render the map when the zoom changes

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 1));
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 1);
  };

  return (
    <div>
      <a className="skiplink" href="#map">
        Go to map
      </a>

      <div id="map" className="map h-screen" tabIndex="0">
        <ModalSetting />
        <div className="flex gap-2 m-2 absolute bottom-0 z-10">
          <button onClick={handleZoomIn} className="btn" >Zoom in</button>
          <button onClick={handleZoomOut} className="btn" >Zoom out</button>
        </div>
      </div>

      <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>


    </div>
  );
};

export default MapPage;
