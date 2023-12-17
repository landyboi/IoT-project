import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./views/Frontpage";
import Subscribe from "./views/Subscribe";
import Register from "./views/Register";
import {useEffect, useState} from "react";
import {getAllDevices} from "./api";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";

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

  return (
      <div
          className="mx-auto max-w-4xl mt-4 py-10 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-x1 shadow-gray-400">
          <Router>
              <TopButtons devices={devices} onSelectDevice={setSelectedDevice} />
              <Inputs devices={devices} onSelectDevice={setSelectedDevice} selectedDevice={selectedDevice}/>
            <Routes>
                <Route path="/" element={ <Frontpage selectedDevice={selectedDevice}/> } />
                <Route path="/subscribe" element={ <Subscribe selectedDevice={selectedDevice}/> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="*" element={<Frontpage selectedDevice={selectedDevice}/>} />
            </Routes>
          </Router>
      </div>
  );
}

export default App;