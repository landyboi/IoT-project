import React from "react";

function Forecast({title}) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {/* this commented code is what I teach during the video
        it has missing key and will show error in browser console
        so use the code below
        what I have done is just added index to loop and
        key attribute to the div element */}

        {/* {items.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))} */}

        <div key={1} className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">title</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">detail</p>
        </div>
        <div key={2} className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">title</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">detail</p>
        </div>
        <div key={3} className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">title</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">detail</p>
        </div>
        <div key={4} className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">title</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">detail</p>
        </div>
              <div key={5} className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">title</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">detail</p>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
