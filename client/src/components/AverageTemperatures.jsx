import React, { useState, useEffect, useCallback } from "react";
import { getLast5DaysAverageMeasurementsForDevice } from "../api";
import moment from "moment";
import warmIcon from '../assets/weather-icons/warm.png';
import mildIcon from '../assets/weather-icons/mild.png';
import coldIcon from '../assets/weather-icons/cold.png';

function AverageTemperatures({ selectedDevice } ) {
    const [averages, setAverages] = useState(null);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            if (selectedDevice) {
                const result = await getLast5DaysAverageMeasurementsForDevice(selectedDevice.id)

                setAverages(result);
                setError(validateData(result));
            }
        } catch (error) {
            setError(true);
            console.error("Error fetching data:", error);
        }
    }, [selectedDevice]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    function validateData(data) {
        return data.every(item => item === null);
    }


    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase"> Average temperature from the last 5 days </p>
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
                {averages ? (
                    averages.map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <p className="text-white font-light text-xs"> {item ? `${moment(item.date).format('dddd')}` : ''} </p>
                            <p className="text-white font-medium text-sm">
                                {item ? `${item.averageTemperature} °C` : 'unknown'}
                            </p>
                            {item ? (
                                item.averageTemperature <= 0 ? (
                                    <img
                                        src={coldIcon}
                                        style={{ width: "40px", height: "40px" }}
                                        alt="Cold"
                                    />
                                ) : item.averageTemperature >= 20 ? (
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

export default AverageTemperatures;
