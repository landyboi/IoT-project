const subscriberService = require("./subscriberService");
const { sendTemplateEmail } = require("./emailService");

const sendWeatherEmail = async (data) => {

    const subscribers = await subscriberService.getSubscribers(data.device);

    subscribers.forEach(subscriber => {
        sendTemplateEmail(subscriber, 'Weather', 'd-663d7909b55f4ee98368c236e79b2dbb', data);
    });
}

module.exports = {
    sendWeatherEmail
}