import { toStringHDMS } from 'ol/coordinate.js';
import { useState } from 'react';
import { splitCoordinates, convertToNestedArray, converteDmsToObject } from '../../../hooks/conversiDMS';

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
