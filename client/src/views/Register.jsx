import ThunderstormButton from "../components/ThunderstormButton";
import {useState} from "react";
import {registerDevice} from "../api";
import {useNavigate} from "react-router-dom";

function Register () {
    const [deviceName, setDeviceName] = useState("");
    const [deviceCountry, setDeviceCountry] = useState("");
    const [isEventDevice, setIsEventDevice] = useState(false);

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setDeviceName(value);
        } else if (name === "country") {
            setDeviceCountry(value);
        }
    };

    const handleRegister = async () => {
        if (!deviceName || !deviceCountry) {
            alert("Please provide device name and country.");
            return;
        }

        try {
            const result = await registerDevice(deviceName, deviceCountry, isEventDevice);

            if (!result || result.error) {
                const errorMessage = result?.message || 'Error registering device. Try again.';
                if (result?.status === 404) {
                    setDeviceCountry("");
                } else if (result?.message === "Name already in use!") {
                    setDeviceName("");
                }
                alert(errorMessage);
                return;
            }

            alert("Device registered successfully!");
            alert("Your device uuid is: " + result.data.uuid);
            setDeviceName("");
            setDeviceCountry("");
            setIsEventDevice(false);
        } catch {
            alert("Error registering device. Try again.");
        }
    };

    const handleReturn = () => {
        navigate('/');
    }

    const handleCheckboxChange = (event) => {
        setIsEventDevice(event.target.checked);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex mb-4 items-center">
                <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">Device name: </p>
                <input
                    type="text"
                    name="name"
                    value={deviceName}
                    onChange={handleInputChange}
                    placeholder="Type device name..."
                    className="px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            <div className="flex mb-4 items-center">
                <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">Device country: </p>
                <input
                    type="text"
                    name="country"
                    value={deviceCountry}
                    onChange={handleInputChange}
                    placeholder="Type device country..."
                    className="px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            <div className="flex mb-4 items-center">
                <label htmlFor="event" className="flex items-center cursor-pointer">
                    <input type="checkbox" id="event" name="event" className="form-checkbox h-5 w-5 text-blue-500" checked={isEventDevice} onChange={handleCheckboxChange}/>
                    <span className="ml-2 text-white">Device is event specific</span>
                </label>
            </div>
            <div>
                <ThunderstormButton disabled={!deviceName || !deviceCountry} onClick={handleRegister}
                                    label={"Register"}/>
                <ThunderstormButton onClick={handleReturn} label={"Back to Frontpage"} type={"returnButton"}/>
            </div>
        </div>
    );
}

export default Register;