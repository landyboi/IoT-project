import React from "react";

function Forecast({ title, values } ) {
  const length = values?.data.length;

  // Create a new array with the last 5 elements of the original array
  const lastFive = values?.data.slice(length - 5, length);

  const forecast = lastFive?.map((item) => {
    return (
<div className="flex flex-row items-center justify-between text-white">
        <div className="flex flex-col items-center justify-center">
          <p className="text-white font-medium text-sm">{item.temperature} °C</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      {forecast}
    </div>
  );
}

export default Forecast;
