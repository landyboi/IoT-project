import React, { useState, useEffect, useCallback } from "react";
import { getLast5MeasurementsForDevice } from "../api";
import warmIcon from '../assets/weather-icons/warm.png';
import mildIcon from '../assets/weather-icons/mild.png';
import coldIcon from '../assets/weather-icons/cold.png';

function LastMeasurements({ selectedDevice } ) {
    const [measurements, setMeasurements] = useState(null);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            if (selectedDevice) {
                const result = await getLast5MeasurementsForDevice(selectedDevice.id)

                setMeasurements(result.data);
                setError(validateData(result.data));
            }
        } catch (error) {
            setError(true);
            console.error("Error fetching data:", error);
        }
    }, [selectedDevice]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setMeasurements(null);
        setError(false);
    }, [selectedDevice]);

    function validateData(data) {
        return data.every(item => item === null);
    }

    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase"> Last 5 measurements </p>
            </div>
            <hr className="my-2" />
            {error ? (
                <div>
                    <h1 className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                        No data found!
                    </h1>
                </div>
            ) : (
            <div className="flex flex-row items-center justify-between text-white">
                {measurements ? (
                    measurements.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <p className="text-white font-medium text-sm">
                                {item ? `${item.temperature} °C` : 'unknown'}
                            </p>
                            {item ? (
                                item.temperature <= 0 ? (
                                    <img
                                        src={coldIcon}
                                        style={{ width: "40px", height: "40px" }}
                                        alt="Cold"
                                    />
                                ) : item.temperature >= 20 ? (
                                    <img
                                        src={warmIcon}
                                        style={{ width: "40px", height: "40px" }}
                                        alt="Warm"
                                    />
                                ) : (
                                    <img
                                        src={mildIcon}
                                        style={{ width: "40px", height: "40px" }}
                                        alt="Mild"
                                    />
                                )
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div>
                        <h1 className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                            Loading...
                        </h1>
                    </div>
                )}
            </div>
                )}
        </div>
    );
}

export default LastMeasurements;
