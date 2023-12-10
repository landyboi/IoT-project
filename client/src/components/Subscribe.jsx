import React from "react";
import { subscribe } from "../api";

function Subscribe({ selectedDevice }) {

    const handleSubscription = async () => {
        const email = window.prompt("Enter your email address:");
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
    }

    return (
        <div>
            {selectedDevice ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={handleSubscription}
            > Subscribe </button>
            ) : (
                <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded m-4"
                    disabled
                > Subscribe </button>
            )}
        </div>
    );
}

export default Subscribe;