import React, {useEffect, useState} from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
} from "@iconscout/react-unicons";
import { getLatestMeasurement } from "../api";


function TemperatureAndDetails() {

  const [measurement, setMeasurement] = useState(null);

  useEffect(async () => {
    const values = await getLatestMeasurement(1);
    setMeasurement(values);
  }, []);

  console.log(measurement);

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>WEATHER:</p>
      </div>

      <div className="flex flex-row items-center justify-center text-white py-3">
        <p className="text-5xl">{measurement.temperature} Degrees</p>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilTemperature />
        <p className="font-ligh text-lg">
          Dew Point:{" "}
          <span className="font-medium text-lg ml-1">
            {measurement.dewpoint}°C
          </span>
        </p>
        <p className="font-light">|</p>

        <UilTear />
        <p className="font-light text-lg">
          Humidity:{" "}
          <span className="font-medium text-lg ml-1">
          {measurement.humidity}%
          </span>
        </p>
        <p className="font-light">|</p>

        <UilWind />
        <p className="font-light text-lg">
          Air Pressure:{" "}
          <span className="font-medium text-lg ml-1">
            {measurement.airpressure}hPa
          </span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
