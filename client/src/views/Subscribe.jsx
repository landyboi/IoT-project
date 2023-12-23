import {subscribe, subscribeToEvent} from "../api";
import {useEffect, useState} from "react";
import ThunderstormButton from "../components/ThunderstormButton";
import {useNavigate} from "react-router-dom";

function Subscribe({ selectedDevice }) {
    const [email, setEmail] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [temperatureBelow, setTemperatureBelow] = useState("");
    const [temperatureOver, setTemperatureOver] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        if (selectedDevice && selectedDevice.eventsupport) {
            const DeviceType = "event";
            setDeviceType(DeviceType);
        } else {
            const DeviceType = "default";
            setDeviceType(DeviceType);
        }
    }, [selectedDevice]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "below") {
            setTemperatureBelow(value);
        } else if (name === "over") {
            setTemperatureOver(value);
        }
    };

    const handleSubscription = async () => {
        if (!email) {
            return alert("Please provide a valid email.");
        }

        const formattedEmail = email.split(" ").join("").toLowerCase();

        try {
            const result = await subscribe(selectedDevice.id, formattedEmail);

            if (!result || result.error) {
                const errorMessage = result?.message || 'Error subscribing to device';

                if (result?.status === 404) {
                    alert(errorMessage);
                } else {
                    alert("Error subscribing to device. Try again.");
                }
                return;
            }

            setEmail("")
            alert(`Successfully subscribed to ${selectedDevice.name}`);
        } catch {
            alert("Error subscribing to device. Try again.");
        }
    };

    const handleEventSubscription = async () => {
        if (!email) {
            return alert("Please provide a valid email.");
        }

        const formattedEmail = email.split(" ").join("").toLowerCase();

        try {
            const result = await subscribeToEvent(selectedDevice.id, formattedEmail, temperatureOver, temperatureBelow);

            if (!result || result.error) {
                const errorMessage = result?.message || 'Error subscribing to device';

                if (result?.status === 404) {
                    alert(errorMessage);
                } else if (result?.status === 400) {
                    alert(errorMessage);
                } else {
                    alert("Error subscribing to device. Try again.");
                }
                return;
            }

            setEmail("")
            setTemperatureBelow("")
            setTemperatureOver("")
            alert(`Successfully subscribed to ${selectedDevice.name}`);
        } catch {
            alert("Error subscribing to device. Try again.");
        }
    };

    const handleReturn = () => {
        navigate('/');
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex mb-4 items-center">
                <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">email: </p>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Type email address..."
                    className="px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            {deviceType === "default" ? (
                <div>
                    <ThunderstormButton disabled={!email} onClick={handleSubscription} label={"Submit"}/>
                    <ThunderstormButton onClick={handleReturn} label={"Back to Frontpage"} type={"returnButton"}/>
                </div>
            ) : (
                <>
                    <p className="flex mb-10 mt-5 items-center text-gray-200 bold"> This device is event specific device  | Define options below: </p>
                    <div className="flex mb-4 items-center">
                        <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">Temperature goes below:</p>
                        <input
                            type="text"
                            name="below"
                            value={temperatureBelow}
                            onChange={handleInputChange}
                            placeholder="Type temperature..."
                            className="px-2 py-1 bg-gray-200 rounded-md flex-grow"
                        />
                    </div>
                    <div className="flex mb-4 items-center">
                        <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">Temperature goes over:</p>
                        <input
                            type="text"
                            name="over"
                            value={temperatureOver}
                            onChange={handleInputChange}
                            placeholder="Type temperature..."
                            className="px-2 py-1 bg-gray-200 rounded-md flex-grow"
                        />
                    </div>
                    <ThunderstormButton disabled={!email || !(temperatureBelow || temperatureOver)} onClick={handleEventSubscription} label={"Submit"}/>
                    <ThunderstormButton onClick={handleReturn} label={"Back to Frontpage"} type={"returnButton"}/>
                </>
            )}
        </div>
    );
}

export default Subscribe;
