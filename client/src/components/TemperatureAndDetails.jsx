import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
} from "@iconscout/react-unicons";

function TemperatureAndDetails() {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>Cloudy or Whatever</p>
      </div>

      <div className="flex flex-row items-center justify-center text-white py-3">
        <p className="text-5xl">34 degree</p>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilTemperature />
        <p className="font-ligh text-lg">
          Dew Point:{" "}
          <span className="font-medium text-lg ml-1">
            45
          </span>
        </p>
        <p className="font-light">|</p>

        <UilTear />
        <p className="font-light text-lg">
          Humidity:{" "}
          <span className="font-medium text-lg ml-1">
            44
          </span>
        </p>
        <p className="font-light">|</p>

        <UilWind />
        <p className="font-light text-lg">
          Air Pressure:{" "}
          <span className="font-medium text-lg ml-1">44</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
