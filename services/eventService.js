const emailService = require("./emailService");

const sendWeatherEmail = async (data) => {
    return await emailService.sendTemplateEmail('tuomas.mellin@metropolia.fi', 'Weather', 'd-663d7909b55f4ee98368c236e79b2dbb', data);
}

module.exports = {
    sendWeatherEmail
}