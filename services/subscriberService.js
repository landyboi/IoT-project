const { Subscribers } = require('../models')

const getSubscribers = async (device) => {
    if (!device) {
        throw new Error("No device provided!")
    }

    const subscribers = await Subscribers.findAll({ where: { device: device, deletedAt: null } });

    const subscriberEmails = subscribers.map(subscriber => subscriber.email);

    return subscriberEmails
}

module.exports = {
    getSubscribers
}