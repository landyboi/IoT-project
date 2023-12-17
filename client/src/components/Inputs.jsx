import Selector from "./DeviceSelector";
import ThunderstormButton from "./ThunderstormButton";
import { useNavigate } from 'react-router-dom';

function Inputs({ devices, onSelectDevice, selectedDevice }) {
    const navigate = useNavigate()

    const redirectToSubscribing = () => {
        navigate('/subscribe');
    };

    const redirectToRegistering = () => {
        navigate('/register');
    };

    const redirectToPlotting = () => {
        navigate(`/plot.html?id=${selectedDevice.id}`);
    };

  return (
      <div className="flex flex-row justify-center my-6">
          <div className="flex flex-row w-3/4 items-center justify-center space-x-4">

                  <Selector devices={devices} onSelectDevice={onSelectDevice}/>
          </div>
          <div className="flex flex-row ml-0">
              <ThunderstormButton disabled={!selectedDevice} onClick={redirectToSubscribing} label={"Subscribe"}/>
              <ThunderstormButton disabled={!selectedDevice} onClick={redirectToRegistering} label={"Register"}/>
              <ThunderstormButton disabled={!selectedDevice} onClick={redirectToPlotting} label={"Plot"}/>
          </div>
      </div>

  );
}

export default Inputs;