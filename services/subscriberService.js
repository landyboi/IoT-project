const { Subscribers } = require('../models')

const getSubscribersForDevice = async (device) => {
    if (!device) {
        throw new Error("No device provided!")
    }

    const subscribers = await Subscribers.findAll({ where: { device: device, deletedAt: null } });

    const subscriberEmails = subscribers.map(subscriber => subscriber.email);

    return subscriberEmails
}

const getAllSubscribers = async () => {
    const subscribers = await Subscribers.findAll({ where: { deletedAt: null } });

    return subscribers
}


module.exports = {
    getSubscribersForDevice
}