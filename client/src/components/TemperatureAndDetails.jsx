import React, {useEffect, useState, useCallback} from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
} from "@iconscout/react-unicons";
import { getLatestMeasurementFromDevice } from "../api";
import moment from "moment";


function TemperatureAndDetails({ selectedDevice }) {
  const [measurement, setMeasurement] = useState(null);
  const [error, setError] = useState(false);
  const [measuredAt, setMeasuredAt] = useState("unknown");
  const fetchData = useCallback(async () => {
    try {
      if (selectedDevice) {
        const result = await getLatestMeasurementFromDevice(selectedDevice.id);

        setMeasurement(result.data);
        setMeasuredAt(moment(result.data.measuredAt).format('MMMM Do YYYY, h:mm'));
      }
    } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
    }
  }, [selectedDevice]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setMeasurement(null);
    setError(false);
  }, [selectedDevice]);

  return (
      <div>
        {error ? (
            <div>
              <h1 className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                No data found!
              </h1>
            </div>
        ) : measurement ? (
            <div>
              <div>
                <p className="flex justify-center py-6 text-xl text-cyan-300">LATEST MEASUREMENT:</p>
                <p className="flex justify-center text-cyan-300"> Measured at: {measuredAt}</p>
                <br/>
              </div>

              <div className="flex flex-row items-center justify-center text-white py-3">
                <p className="text-5xl">{measurement.temperature} °C</p>
              </div>

              <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                <UilTemperature/>
                <p className="font-ligh text-lg">
                  Dew Point:{' '}
                  <span className="font-medium text-lg ml-1">
                {measurement.dewpoint}°C
              </span>
                </p>
                <p className="font-light">|</p>

                <UilTear/>
                <p className="font-light text-lg">
                  Humidity:{' '}
                  <span className="font-medium text-lg ml-1">
                {measurement.humidity}%
              </span>
                </p>
                <p className="font-light">|</p>

                <UilWind/>
                <p className="font-light text-lg">
                  Air Pressure:{' '}
                  <span className="font-medium text-lg ml-1">
                {measurement.airpressure}hPa
              </span>
                </p>
              </div>
            </div>
        ) : (
            <div>
              <h1 className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">Loading...</h1>
            </div>
        )}
      </div>
  );
}

export default TemperatureAndDetails;
