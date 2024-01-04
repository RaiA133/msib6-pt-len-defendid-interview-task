import {toLonLat} from 'ol/proj';


const DmsToDd = () => {
  // const asd = toLonLat([5104445.9499433115, 4618019.500877207])
  // console.log('dmstodd', asd)

  return (
    <>
      <p className='text-center mb-3'>Convert Cordinate DMS to DD</p>

      <div className='border border-gray-500 rounded-xl p-5 mb-3'>
        <div className="w-full flex items-center gap-2 mb-3">
          <span className="label-text w-20">Latitude</span>
          <input 
            type="text" 
            className="input input-bordered w-full" 
            // onChange={() => ddToDMS(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center gap-2 mb-3">
          <span className="label-text w-20">Longitude</span>
          <input 
            type="text" 
            className="input input-bordered w-full"
            // onChange={() => ddToDMS(e.target.value)}
          />
        </div>
        <div className='flex justify-end'>
          <button className='btn btn-sm'>Convert</button>
        </div>
      </div>

      <div className='border border-gray-500 rounded-xl p-5'>
        <div className="w-full flex items-center justify-between gap-2 mb-3">
          <span className="label-text w-20">Latitude</span>
          <p>90.000000 deg</p>
        </div>
        <div className="w-full flex items-center justify-between gap-2 mb-3">
          <span className="label-text w-20">Latitude</span>
          <p>33.230000 deg</p>
        </div>
        <div className='flex justify-end mt-5'>
          <button className='btn btn-sm'>Add to Map</button>
        </div>
      </div>
    </>
  );
}

export default DmsToDd;