const axios = require('axios');
const moment = require('moment-timezone');

async function getLatestPriceData() {
    try {
        const response = await axios.get('https://api.porssisahko.net/v1/latest-prices.json');

        return response.data.prices;
    } catch (error) {
        throw new Error(error);
    }
}

async function getSpecificPriceForDate(date, hour) {
    try {
        const response = await axios.get(`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${hour}`);

        return response.data.price
    } catch (error) {
        throw new Error(error);
    }
}

async function getCurrentPrice() {
    const timezone = 'Europe/Helsinki';
    const currentHour = moment.tz(timezone).format('HH');
    const currentDate = moment.tz(timezone).format('YYYY-MM-DD');

    try {
        const response = await axios.get(`https://api.porssisahko.net/v1/price.json?date=${currentDate}&hour=${currentHour}`);

        return response.data.price
    } catch (error) {
        throw new Error(error);
    }
}


async function getNextHoursPrice() {
    const timezone = 'Europe/Helsinki';
    const now = moment.tz(timezone);
    const currentHour = now.hour();

    let nextHour;
    let nextDate;

    if (currentHour === 23) {
        nextHour = 0;
        nextDate = now.clone().add(1, 'day').format('YYYY-MM-DD');
    } else {
        nextHour = currentHour + 1;
        nextDate = now.format('YYYY-MM-DD');
    }

    try {
        const response = await axios.get(`https://api.porssisahko.net/v1/price.json?date=${nextDate}&hour=${nextHour}`);

        return response.data.price
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = { getLatestPriceData, getSpecificPriceForDate, getCurrentPrice, getNextHoursPrice }