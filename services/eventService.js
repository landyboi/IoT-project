const { getAllSubscribers } = require("../api/services/subscriberService");
const { getLatestMeasurementByDevice } = require("../api/services/measurementService");
const { sendTemplateEmail } = require("./emailService");


const sendDailyWeatherEmail = async () => {
    console.log('Sending daily weather email...')

    const latestMeasurements = {};

    try {
        const allSubscribers = await getAllSubscribers().then(result => result.data);

        if (allSubscribers) {
            for (const subscriber of allSubscribers) {
                const device = subscriber.device;

                let data = latestMeasurements[device];

                if (!data) {
                    const result = await getLatestMeasurementByDevice(device).then(result => result.data);
                    latestMeasurements[device] = result;
                    data = result;
                }

                if (data) {
                    await sendTemplateEmail(subscriber.email, 'Weather', 'd-663d7909b55f4ee98368c236e79b2dbb', data)
                }
            }
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


module.exports = {
    sendDailyWeatherEmail
}