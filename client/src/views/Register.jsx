import ThunderstormButton from "../components/ThunderstormButton";
import {useState} from "react";
import {registerDevice} from "../api";
import {useNavigate} from "react-router-dom";

function Register () {
    const [deviceName, setDeviceName] = useState("");
    const [deviceCountry, setDeviceCountry] = useState("");

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
        if (deviceName && deviceCountry) {
            const result = await registerDevice(deviceName, deviceCountry)

            if (result) {
                alert("Device registered successfully!");
                setDeviceName("");
                setDeviceCountry("");
            } else if (result.status === 404) {
                alert(result.data.message || "Country not found or supported!");
                setDeviceCountry("")
            } else if (result.data.message === "Name already in use!") {
                alert(result.data.message || "Name already in use!");
                setDeviceName("")
            } else {
                alert("Error registering device. Try again.");
            }
        }
    }

    const handleReturn = () => {
        navigate('/');
    }

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
                    placeholder="Type device name..."
                    className="px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            <div>
                <ThunderstormButton disabled={!deviceName || !deviceCountry} onClick={handleRegister} label={"Register"}/>
                <ThunderstormButton onClick={handleReturn} label={"Back to Frontpage"} type={"returnButton"}/>
            </div>
        </div>
    );
}

export default Register;