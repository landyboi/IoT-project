import Selector from "./DeviceSelector";

function Inputs({ devices, onSelectDevice }) {

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <Selector devices={devices} onSelectDevice={onSelectDevice}/>
      </div>
    </div>
  );
}

export default Inputs;