const axios = require('axios');

async function getLatestPriceData() {
    try {
        const response = await axios.get('https://api.porssisahko.net/v1/latest-prices.json');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

async function getSpecificPriceForDate(date, time) {
    try {
        const response = await axios.get(`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${time}`);
        return response.data.price
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getLatestPriceData, getSpecificPriceForDate }