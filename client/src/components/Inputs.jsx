import Selector from "./DeviceSelector";
import Subscribe from "./Subscribe";

function Inputs({ devices, onSelectDevice, selectedDevice }) {

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
          <Selector devices={devices} onSelectDevice={onSelectDevice}/>
          <Subscribe selectedDevice={selectedDevice}/>
      </div>
    </div>
  );
}

export default Inputs;