import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/devices',
    headers: {
        'Content-Type': 'application/json',
        'key' : "key"
    },
});

export const getDevices = async () => {
    return {
    "message": "Database search completed successfully!",
    "data": [
        {
            "id": 1,
            "name": "Device 1",
            "country": "FIN",
            "uuid": "2a20f2fe-c601-4db7-8e8d-521bc91fe0ef",
            "deletedAt": null,
            "createdAt": "2023-11-08T12:00:00.000Z",
            "updatedAt": "2023-11-08T12:00:00.000Z"
        },
        {
            "id": 2,
            "name": "Device 2",
            "country": "FRA",
            "uuid": "d2337cc6-5925-4940-a310-59ea050505f3",
            "deletedAt": null,
            "createdAt": "2023-11-07T14:00:00.000Z",
            "updatedAt": "2023-11-07T14:00:00.000Z"
        },
        {
            "id": 4,
            "name": "testi",
            "country": "FIN",
            "uuid": "c8348b3a-47b3-4154-98be-40825bfc9ecd",
            "deletedAt": null,
            "createdAt": "2023-11-15T11:13:24.000Z",
            "updatedAt": "2023-11-15T11:13:24.000Z"
        },
        {
            "id": 6,
            "name": "testi123",
            "country": "FIN",
            "uuid": "d2c2294a-a085-4172-b340-6d2eafca7301",
            "deletedAt": null,
            "createdAt": "2023-12-01T20:25:59.000Z",
            "updatedAt": "2023-12-01T20:25:59.000Z"
        }
    ]};
}