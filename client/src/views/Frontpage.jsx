import TimeAndLocation from "../components/TimeAndLocation";
import TemperatureAndDetails from "../components/TemperatureAndDetails";
import LastMeasurements from "../components/LastMeasurements";
import AverageTemperatures from "../components/AverageTemperatures";


function Frontpage ({ selectedDevice} ) {

    return (
        <>
            <TimeAndLocation />
            <TemperatureAndDetails selectedDevice={selectedDevice}/>
            <LastMeasurements selectedDevice={selectedDevice}/>
            <AverageTemperatures selectedDevice={selectedDevice}/>
        </>
    )
}

export default Frontpage;