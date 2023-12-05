import axios from 'axios';

const apiDevices = axios.create({
    baseURL: 'http://localhost:3000/api/devices',
    headers: {
        'Content-Type': 'application/json',
        'key' : "tuomasadmin"
    },
});

const apiValues = axios.create({
    baseURL: 'http://localhost:3000/api/values',
    headers: {
        'Content-Type': 'application/json',
        'key' : "tuomasclient"
    },
});

export const getValues = async (device) => {
    return await apiValues.get('/').then((res) => {
        return res.data;
    }).catch((error) => {
        console.log(error);
    });
}
export const getDevices = async () => {
    return await apiDevices.get('/').then((res) => {
        return res.data;
    }).catch((error) => {
        console.log(error);
    });
};