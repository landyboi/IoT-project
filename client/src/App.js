import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import { useState, useEffect } from "react";

function App() {


  return (
    <div
      className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-x1 shadow-gray-400"
    >
      <TopButtons devices={devices}/>
      <Inputs devices={devices}/>
      <TimeAndLocation />
      <TemperatureAndDetails />
      <Forecast title="Last 5 measurements" values={values}/>
      <Forecast title="Avarage temperature from the last 5 days"/>

    </div>
  );
}

export default App;