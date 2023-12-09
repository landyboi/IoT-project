const { getAllSubscribers } = require("../api/services/subscriberService");
const { getLatestMeasurementByDevice } = require("../api/services/measurementService");
const { sendTemplateEmail } = require("./emailService");


const sendDailyWeatherEmail = async () => {
    const latestMeasurementArray = [];

    const allSubscribers = await getAllSubscribers().then(result => result.data);

    for (const subscriber of allSubscribers) {
        const device = subscriber.device;
        let data = latestMeasurementArray.find(item => item.device === device);

        if (!data) {
            const latestMeasurement = await getLatestMeasurementByDevice(device).then(result => result.data);
            latestMeasurementArray.push({ device: latestMeasurement });
            data = latestMeasurement;
        }

        await sendTemplateEmail(subscriber.email, 'Weather', 'd-663d7909b55f4ee98368c236e79b2dbb', data)
    }

}


module.exports = {
    sendDailyWeatherEmail
}