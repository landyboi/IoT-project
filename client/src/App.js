import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import { getDevices } from "./api";
import { useState, useEffect } from "react";

function App() {

const [devices, setDevices] = useState(null);

useEffect(async() => {
    const devices = await getDevices();
    console.log(devices);
    setDevices(devices);
}, []);

console.log(devices);
  return (
    <div
      className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-x1 shadow-gray-400"
    >
      <TopButtons devices={devices}/>
      <Inputs devices={devices}/>
      <TimeAndLocation />
      <TemperatureAndDetails />
      <Forecast title="Last hour measurements"/>
      <Forecast title="Last 5 days measurements"/>

    </div>
  );
}

export default App;