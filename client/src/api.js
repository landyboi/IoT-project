import axios from 'axios';
import moment from "moment";

const api = axios.create({
    baseURL: 'https://team5.ddns.net/api',
    headers: {
        'Content-Type': 'application/json',
        'key': 'tuomasclient'
    }
});


export const getLatestMeasurementFromDevice = async (device) => {
    const result = await api.get('/values/latest', {
        params: {
            id: device
        }
    });

    return result.data.data;
}


export const getAllDevices = async () => {
    const result = await api.get('/devices/client');

    return result.data.data;
};


export const getTodaysMeasurementsForDevice = async (device) => {
    const today = moment().format('YYYY-MM-DD');

    const result = await api.get(`/values/${device}/${today}`);

    return result.data.data;
};


export const getLast5DaysAverageMeasurementsForDevice = async (device) => {
    const today = moment().format('YYYY-MM-DD');
    const day2 = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const day3 = moment().subtract(2, 'days').format('YYYY-MM-DD');
    const day4 = moment().subtract(3, 'days').format('YYYY-MM-DD');
    const day5 = moment().subtract(4, 'days').format('YYYY-MM-DD');

    const data = {
        "device": device,
        "dates": [today, day2, day3, day4, day5]
    };

    const result = await api.post('/average', data);

    return result.data.data;
}


export const getLast5MeasurementsForDevice = async (device) => {
    const result = await api.get('/values/last5', {
        params: {
            id: device
        }
    });

    return result.data;
}