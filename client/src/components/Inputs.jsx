import Selector from "./DeviceSelector";
import Subscribe from "./Subscribe";
import React from "react";

function Inputs({ devices, onSelectDevice, selectedDevice }) {

    const redirectToPlotting = () => {
        window.location.href = `/plot.html?id=${selectedDevice.id}`;
    };

  return (
      <div className="flex flex-row justify-center my-6">
          <div className="flex flex-row w-3/4 items-center justify-center space-x-4">

                  <Selector devices={devices} onSelectDevice={onSelectDevice}/>
          </div>
          <div className="flex flex-row ml-0">
                  <Subscribe selectedDevice={selectedDevice}/>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                          onClick={redirectToPlotting}
                  > Graph
                  </button>
          </div>
      </div>

  );
}

export default Inputs;