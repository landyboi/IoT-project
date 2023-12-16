const { getAllSubscribers } = require("../api/services/subscriberService");
const { getLatestMeasurementByDevice } = require("../api/services/measurementService");
const { sendEmail, sendTemplateEmail } = require("./emailService");
const { getEventsForDevice } = require("../api/services/eventService");




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


const checkForEvents = async (device, measurement) => {
    try {
        const events = await getEventsForDevice(device).then(result => result.data);

        if (events) {
            for (const event of events) {
                if (event.options !== null) {
                    const options = event.options;
                    if (measurement.temperature >= options.goesOver) {
                        await sendEmail(event.email, 'Temperature is over the limit!', `<h1>Temperature is over ${options.goesOver}</h1>`)
                    }

                    if (measurement.temperature <= options.goesBelow) {
                        await sendEmail(event.email, 'Temperature is under the limit!', `<h1>Temperature is under ${options.goesBelow}!</h1>`)
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error checking for events:', error);
    }
}




module.exports = {
    sendDailyWeatherEmail,
    checkForEvents
}