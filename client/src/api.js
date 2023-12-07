import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'key': 'tuomasclient'
    }
});



export const getLatestMeasurement = async (device) => {
    const result = await api.get('/values/latest', {
        params: {
            id: device
        }
    });

    return result.data
}

export const getAllDevices = async () => {
    const result = await api.get('/devices/client');

    return result.data;
};

export const getTodaysMeasurementsForDevice = async (device) => {
    const today = new Date();
    const datestamp = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

    const result = await api.get(`/values/${device}/${datestamp}`);

    return result.data;
};