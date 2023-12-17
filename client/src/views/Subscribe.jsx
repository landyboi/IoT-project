import { subscribe } from "../api";
import {useEffect, useState} from "react";
import ThunderstormButton from "../components/ThunderstormButton";
import {useNavigate} from "react-router-dom";

function Subscribe({ selectedDevice }) {
    const [email, setEmail] = useState("");
    const [deviceType, setDeviceType] = useState("default");

    const navigate = useNavigate()

    useEffect(() => {
        const DeviceType = "default"
        setDeviceType(DeviceType);
    }, [selectedDevice]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "below" || name === "over") {
            setDeviceType(value);
        }
    };

    const handleSubscription = async () => {
        if (email) {
            const formattedEmail = email.split(" ").join("").toLowerCase();
            const result = await subscribe(selectedDevice.id, formattedEmail);

            if (result === 200) {
                alert(`Successfully subscribed to ${selectedDevice.name}`);
            } else if (result.status === 404) {
                alert(result.data.message || "Error subscribing to device");
            } else {
                alert("Error subscribing to device. Try again.");
            }
        }
    };

    const handleEventSubscription = async () => {
        // HANDLE EVENT SUBSCRIPTION
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
                    <p className="flex mb-10 mt-5 items-center text-gray-200 bold"> This device is event specific device. Define options below: </p>
                    <div className="flex mb-4 items-center">
                        <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">Temperature goes below:</p>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Type temperature..."
                            className="px-2 py-1 bg-gray-200 rounded-md flex-grow"
                        />
                    </div>
                    <div className="flex mb-4 items-center">
                        <p className="text-white text-lg font-light flex-shrink-0 w-60 mr-2">Temperature goes over:</p>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Type temperature..."
                            className="px-2 py-1 bg-gray-200 rounded-md flex-grow"
                        />
                    </div>
                    <ThunderstormButton disabled={!email} onClick={handleEventSubscription} label={"Submit"}/>
                    <ThunderstormButton onClick={handleReturn} label={"Back to Frontpage"} type={"returnButton"}/>
                </>
            )}
        </div>
    );
}

export default Subscribe;
