import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import '../assets/css/PopUpCoord.css';
import '../../node_modules/ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import ModalSetting from '../components/Map/ModalSetting';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Icon, Style} from 'ol/style.js';
import {OGCMapTile, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';


const MapPage = () => {
  const [zoom, setZoom] = useState(2);
  const [popupCoordinate, setPopupCoordinate] = useState(null);
  const [popupCoordinateHdms, setPopupCoordinateHdms] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [modalSetting, setModalSetting] = useState(false)

  const key = 'co2aeeDSB4uXmd30LYwi';
  const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: attributions,
            url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key,
            tileSize: 512,
          }),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: zoom,
      }),
    });
    map.on('dblclick', function (evt) {
      const coordinate = evt.coordinate;
      const hdmsCoord = toStringHDMS(toLonLat(coordinate));
      setPopupCoordinate(toLonLat(coordinate));
      setPopupCoordinateHdms(hdmsCoord);
    });

  }, [zoom]);

  const handleZoomIn = () => {
    console.log("Zoom In button clicked");
    setZoom((prevZoom) => prevZoom + 1);
  };
  
  const handleZoomOut = () => {
    console.log("Zoom Out button clicked");
    setZoom((prevZoom) => Math.max(prevZoom - 1, 1));
  };

  const showPopup = (e) => {
    const offsetX = 2; // Jarak horizontal dari kursor
    const offsetY = 2; // Jarak vertikal dari kursor

    setPopupPosition({ x: e.clientX + offsetX, y: e.clientY - offsetY });
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  const copyCoordinates = (type) => {
    const coordinatesToCopy = type === 1 ? popupCoordinate : popupCoordinateHdms;
    navigator.clipboard.writeText(coordinatesToCopy);
  };

  const locationMarker = new Feature({
    geometry: new Point(fromLonLat([12.5, 41.9])),
  });

  locationMarker.setStyle(
    new Style({
      image: new Icon({
        color: '#BADA55',
        crossOrigin: 'anonymous',
        src: 'data/square.svg',
      }),
    })
  );

  const vectorSource = new VectorSource({
    features: [locationMarker],
  });
  
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  
  const rasterLayer = new TileLayer({
    source: new OGCMapTile({
      url: 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad',
      crossOrigin: '',
    }),
  });
  const map = new Map({
    layers: [rasterLayer, vectorLayer],
    target: document.getElementById('map'),
    view: new View({
      center: fromLonLat([2.896372, 44.6024]),
      zoom: 3,
    }),
  });

  return (


    <div>
      {!modalSetting && (
        <div
          className={`popup-container ${isVisible ? '' : 'hidden'} absolute z-10`}
          style={{ left: `${popupPosition.x}px`, top: `${popupPosition.y}px` }}
        >
          <div className="popup bg-white shadow p-4">

            <div className='flex justify-between items-center gap-3 mb-1'>
              <p className='text-xs'>{popupCoordinate}</p>
              <button onClick={() => copyCoordinates(1)} className="btn btn-xs btn-info">
                Copy
              </button>
            </div>

            <div className='flex justify-between items-center gap-3 mb-3'>
              <p className='text-xs'>{popupCoordinateHdms}</p>
              <button onClick={() => copyCoordinates(0)} className="btn btn-xs btn-info">
                Copy
              </button>
            </div>
            
            <button onClick={closePopup} className="btn btn-xs text-white">
              Close
            </button>
          </div>
        </div>
      )}

      <a className="skiplink" href="#map">
        Go to map
      </a>

      <div id="map" className="map h-screen" tabIndex="0" onDoubleClick={showPopup}>
        <ModalSetting setModalSetting={setModalSetting}/>
        <div className="flex gap-2 m-2 absolute bottom-0 z-10">
          <button onClick={handleZoomIn} className="btn" >Zoom in</button>
          <button onClick={handleZoomOut} className="btn" >Zoom out</button>
        </div>
      </div>

    </div>

  );
};

export default MapPage;
