import React, { useState, useEffect, useCallback } from "react";
import { getLast5DaysAverageMeasurementsForDevice } from "../api";

function Forecast({ title, selectedDevice } ) {
    const [averages, setAverages] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            if (selectedDevice) {
                const result = await getLast5DaysAverageMeasurementsForDevice(selectedDevice.id)
                setAverages(result.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [selectedDevice]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setAverages(null);
    }, [selectedDevice]);


  return (
      <div>
          <div className="flex items-center justify-start mt-6">
              <p className="text-white font-medium uppercase">{title}</p>
          </div>
          {averages ? (
              averages.map((item) => (
          <div className="flex flex-row items-center justify-between text-white">
              <div className="flex flex-col items-center justify-center">
                  <p className="text-white font-medium text-sm">{item ? `${item.averageTemperature} °C` : 'null'}</p>
                  <img
                      src="http://openweathermap.org/img/wn/01d@2x.png"
                      className="w-12 my-1"
                      alt=""
                  />
              </div>
          </div>
              ))
                ) : (
              <div>
                  <h1 className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">Loading...</h1>
              </div>
          )}
      </div>
  );
}

export default Forecast;
