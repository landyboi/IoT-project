import React, {useEffect, useState} from "react";

function TopButtons({ devices, onSelectDevice }) {
    const [renderedDevices, setRenderedDevices] = useState(null);

    const handleSelectDevice = (device) => {
        onSelectDevice(device);
    };

    useEffect(() => {
        if (devices && devices.length > 0) {
            const shuffledDevices = devices.sort(() => Math.random() - 0.5);
            const selectedDevices = shuffledDevices.slice(0, 3);
            setRenderedDevices(selectedDevices);
        }
    }, [devices]);

    return (
      <div className="flex items-center justify-around py-0 px-50">
          {renderedDevices ? (
            renderedDevices.map((device) => (
                <button
                    key={device.id}
                    className="text-white text-lg font-medium"
                    onClick={() => handleSelectDevice(device)}
                >
                  {device.name}
                </button>
            ))
          ) : (
              <div>
                  <h1 className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                      Loading...
                  </h1>
              </div>
          )}
      </div>
    );
}

export default TopButtons;
