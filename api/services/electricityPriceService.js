const { getLatestPriceData, getCurrentPrice } = require('../../services/electricityPriceFetcher');

const isElectricityPriceHigh = async () => {
    const prices = await getLatestPriceData();
    const currentPrice = await getCurrentPrice();

    if (!currentPrice) {
        return { success: false, message: 'Error fetching the current price!' };
    }

    if (prices) {
        let totalPrice = 0;

        prices.forEach((item) => {
            totalPrice += item.price;
        });

        const averagePrice = totalPrice / prices.length;

        if (currentPrice >= (averagePrice*1.2)) {
            return { success: true, data: 'high' };
        } else if (currentPrice <= (averagePrice*0.8)) {
            return { success: true, data: 'low' };
        } else {
            return { success: true, data: 'moderate' };
        }
    }

    if (!prices){
        if (currentPrice >= electricityPriceTable.high) {
            return { success: true, data: 'high' };
        } else if (currentPrice <= electricityPriceTable.low) {
            return { success: true, data: 'low' };
        } else {
            return { success: true, data: 'moderate' };
        }
    }
}

const electricityPriceTable = {
    'low': '10',
    'high': '25',
};



module.exports = {
    isElectricityPriceHigh
}