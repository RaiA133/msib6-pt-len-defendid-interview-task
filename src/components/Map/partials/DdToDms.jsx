import { toStringHDMS } from 'ol/coordinate.js';
import { useState } from 'react';
import { splitCoordinates, convertToNestedArray, converteDmsToObject } from '../../../hooks/conversiDMS';
import Feature from 'ol/Feature.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';


const DdToDms = () => {
  const [coord, setCoord] = useState([90.000000, 33.230000]);
  const [convertedCoordinates, setConvertedCoordinates] = useState('0 0');

  const handleCoordinateChange = (index, value) => {
    const newCoord = [...coord];
    newCoord[index] = parseFloat(value) || 0;
    setCoord(newCoord);
  };

  const convertCoordinates = () => {
    const newCoordinates = toStringHDMS([coord[1], coord[0]]);
    setConvertedCoordinates(newCoordinates);
  };

  // hooks memecah object hasil DD to DMS
  const splitOneByOne = splitCoordinates(convertedCoordinates);
  const splitLonLat = convertToNestedArray(splitOneByOne)
  const dmsJson = converteDmsToObject(splitLonLat)


  // fungsi untuk add to map
  const handleAddToMap = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    addMarker(lat, lon);
  };


  var polyCoords = '[3143090.603086447, 9928281.393790578], [3283734.7351311715, 9928892.890016861], [3181003.3691158947, 9849398.380600277], [3143090.603086447, 9928281.393790578]';
  var pointCoords = [3229617.319105267, 9916160.39109719];

  const feature = new Feature({
    geometry: new Polygon(polyCoords),
    labelPoint: new Point(pointCoords),
    name: 'My Polygon',
  });
  const poly = feature.getGeometry();
  feature.setGeometryName('labelPoint');
  const point = feature.getGeometry();

  return (
    <>
      <p className='text-center mb-3'>Convert Cordinate DD to DMS</p>
      <div className='border border-gray-500 rounded-xl p-5 mb-3'>
        <div className="w-full flex items-center gap-2 mb-3">
          <span className="label-text w-20">Latitude</span>
          <input
            type="text"
            className="input input-bordered w-full"
            onChange={(e) => handleCoordinateChange(0, e.target.value)}
            defaultValue="90.000000"
          />
        </div>
        <div className="w-full flex items-center gap-2 mb-3">
          <span className="label-text w-20">Longitude</span>
          <input
            type="text"
            className="input input-bordered w-full"
            onChange={(e) => handleCoordinateChange(1, e.target.value)}
            defaultValue="33.230000"
          />
        </div>
        <div className='flex justify-end'>
          <button className='btn btn-sm' onClick={convertCoordinates}>
            Convert
          </button>
        </div>
      </div>

      <div className='border border-gray-500 rounded-xl p-5'>
        <div className="w-full flex items-center justify-between gap-2 mb-3">
          <span className="label-text w-20">Latitude</span>
          <p>{dmsJson.latitude} deg</p>
        </div>
        <div className="w-full flex items-center justify-between gap-2 mb-3">
          <span className="label-text w-20">Latitude</span>
          <p>{dmsJson.longitude} deg</p>
        </div>
        <div className='flex justify-end mt-5'>
          <button className='btn btn-sm'>Add to Map</button>
        </div>
      </div>

    </>
  );
};

export default DdToDms;
