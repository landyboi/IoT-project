import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
} from "@iconscout/react-unicons";

function TemperatureAndDetails({ values }) {
  //Store the length of the array
  const length = values?.data.length;
  const temperature = values?.data[length - 1].temperature;
  const airpressure = values?.data[length - 1].airpressure;
  const humidity = values?.data[length - 1].humidity;
  const dewpoint = values?.data[length - 1].dewpoint;

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>Cloudy or Whatever</p>
      </div>

      <div className="flex flex-row items-center justify-center text-white py-3">
        <p className="text-5xl">{temperature} Degrees</p>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilTemperature />
        <p className="font-ligh text-lg">
          Dew Point:{" "}
          <span className="font-medium text-lg ml-1">
            {dewpoint}°C
          </span>
        </p>
        <p className="font-light">|</p>

        <UilTear />
        <p className="font-light text-lg">
          Humidity:{" "}
          <span className="font-medium text-lg ml-1">
          {humidity}%
          </span>
        </p>
        <p className="font-light">|</p>

        <UilWind />
        <p className="font-light text-lg">
          Air Pressure:{" "}
          <span className="font-medium text-lg ml-1">
            {airpressure}hPa
          </span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
