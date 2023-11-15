const emailService = require("./emailService");

const sendWeatherEmail = async (data) => {
    const result = await emailService.sendTemplateEmail('tuomas.mellin@metropolia.fi', 'Weather', 'd-663d7909b55f4ee98368c236e79b2dbb', data);
    console.log(result)
}

module.exports = {
    sendWeatherEmail
}