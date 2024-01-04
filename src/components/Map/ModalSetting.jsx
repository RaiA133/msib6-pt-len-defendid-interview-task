import GearIcon from '../../assets/icons/gear.svg';
import DdToDms from './partials/DdToDms';
import DmsToDd from './partials/DmsToDd';

const ModalSetting = ({ setModalSetting }) => {

  return (
    <>
      <button className="btn btn-neutral m-2 absolute right-0 z-10 px-2" onClick={() => {
        document.getElementById('settings_modal').showModal()
        setModalSetting(true)
      }}>
        <img src={GearIcon} alt="Your SVG" className='color-white' width={30} />
      </button>

      <dialog id="settings_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setModalSetting(false)}>✕</button>
          </form>

          <div role="tablist" className="tabs tabs-bordered">

            <input type="radio" name="my_tabs_1" role="tab" className="tab truncate min-w-20" aria-label="DMS to DD" defaultChecked />
            <div role="tabpanel" className="tab-content mt-5">
              <DmsToDd />
            </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab truncate min-w-20" aria-label="DD to DMS" />
            <div role="tabpanel" className="tab-content mt-5">
              <DdToDms />
            </div>

          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setModalSetting(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ModalSetting;