import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import AverageTemperatures from "./components/AverageTemperatures";
import LastMeasurements from "./components/LastMeasurements";
import { useState, useEffect } from "react";
import { getAllDevices } from "./api";

function App() {
    const [devices, setDevices] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getAllDevices();
        setDevices(result);
        setSelectedDevice(result[0]);
      }
        fetchData();
    }, []);

  useEffect(() => {
    console.log(selectedDevice)
  }, [selectedDevice]);


  return (
    <div
      className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-x1 shadow-gray-400">

        <TopButtons devices={devices} onSelectDevice={setSelectedDevice}/>
        <Inputs devices={devices} onSelectDevice={setSelectedDevice}/>
        <TimeAndLocation />
        <TemperatureAndDetails selectedDevice={selectedDevice}/>
        <LastMeasurements selectedDevice={selectedDevice}/>
        <AverageTemperatures selectedDevice={selectedDevice}/>
    </div>
  );
}

export default App;