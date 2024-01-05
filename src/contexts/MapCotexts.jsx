import { createContext } from "react";
import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import Overlay from 'ol/Overlay';


/**
 * Konteks untuk menyediakan objek peta dan fungsi terkait.
 * @type {React.Context}
 */
export const MapCotexts = createContext();

/**
 * Penyedia konteks untuk menyediakan objek peta dan fungsi terkait kepada komponen-komponen anak.
 *
 * @param {Object} props - Properti komponen.
 * @param {React.Node} props.children - Komponen-komponen anak yang akan menerima konteks.
 * @returns {React.Component} - Komponen penyedia konteks.
 */
export const MapCotextsProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(90);  // Set initial latitude
  const [longitude, setLongitude] = useState(33 + 13 / 60 + 48 / 3600);  // Set initial longitude

  /**
   * Menginisialisasi peta ketika komponen dimount.
   *
   * @effect
   */ 
  useEffect(() => {
    const newMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [longitude, latitude], 
      }),
    });
    setMap(newMap);
    return () => {
      if (newMap) {
        newMap.getOverlays().clear();
      }
    };
  }, [latitude, longitude]); 

  /**
   * Menambahkan marker pada peta.
   *
   * @param {number} lat - Garis lintang.
   * @param {number} lon - Garis bujur.
   */
  const addMarker = (lat, lon) => {
    map.getOverlays().clear();
    const marker = new Overlay({
      position: [lon, lat],
      positioning: 'center-center',
      element: document.getElementById('marker'),
      stopEvent: false,
    });

    map.addOverlay(marker);
  };

  return <MapCotexts.Provider value={{
    map, setMap
  }}>{children}</MapCotexts.Provider>;
}