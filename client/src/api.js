import axios from 'axios';
import moment from "moment";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
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

    const testDate = '2023-11-15'
    const result = await api.get(`/values/${device}/${testDate}`);

    return result.data.data;
};


export const getLast5DaysAverageMeasurementsForDevice = async (device) => {
    const today = moment().format('YYYY-MM-DD');
    const day2 = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const day3 = moment().subtract(2, 'days').format('YYYY-MM-DD');
    const day4 = moment().subtract(3, 'days').format('YYYY-MM-DD');
    const day5 = moment().subtract(4, 'days').format('YYYY-MM-DD');
}