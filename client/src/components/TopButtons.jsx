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
      <div className="flex items-center justify-around my-6">
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
                  <h1>Loading...</h1>
              </div>
          )}
      </div>
    );
}

export default TopButtons;
