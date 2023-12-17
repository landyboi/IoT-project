import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

function TopButtons({ devices, onSelectDevice }) {
    const [renderedDevices, setRenderedDevices] = useState(null);

    const navigate = useNavigate()

    const handleSelectDevice = (device) => {
        onSelectDevice(device);
        navigate('/');
    };

    const shuffledDevices = useMemo(() => {
        if (devices && devices.length > 0) {
            return devices.slice().sort(() => Math.random() - 0.5);
        }
        return [];
    }, [devices]);

    useEffect(() => {
        const selectedDevices = shuffledDevices.slice(0, 3);
        setRenderedDevices(selectedDevices);
    }, [shuffledDevices]);

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
