const { Subscribers, Devices} = require('../../models');


const getAllSubscribers = async () => {
    try {
        const subscribers = await Subscribers.findAll({where: {deletedAt: null}});

        if (subscribers.length === 0) {
            return {success: false, message: "No subscribers found!"}
        }

        return {success: true, data: subscribers}
    } catch (error) {
        throw new Error("Error searching the database!");
    }
}


const getSubscribersForDevice = async (device) => {
    try {
        const subscribers = await Subscribers.findAll({where: {device: device, deletedAt: null}});

        return subscribers;
    } catch (error) {
        throw new Error("Error searching the database!");
    }
}


const subscribe = async (email, device, ip) => {
    try {
        const subscriber = await Subscribers.findOne({where: {email: email, device: device}});

        if (subscriber) {
            return {success: false, message: "Subscriber already exists!"}
        }

        const deviceResult = await Devices.findByPk(device);

        if (!deviceResult) {
            return {success: false, message: "Device not found!"}
        }

        const result = await Subscribers.create({
            email: email,
            ip_address: ip,
            device: device,
        });

        if (result) {
            return {success: true, data: result}
        }
    } catch (error) {
        throw new Error("Error storing the entry in the database!");
    }
}


const unsubscribe = async (id) => {
    try {
        const subscriber = await Subscribers.findByPk(id);

        if (!subscriber) {
            return {success: false, message: "Subscriber not found!"}
        }

        subscriber.deletedAt = new Date();
        await subscriber.save();

        if (subscriber.deletedAt) {
            return {success: true, data: subscriber}
        }
    } catch (error) {
        throw new Error("Error deleting the entry from the database!");
    }
}



module.exports = {
    getSubscribersForDevice,
    getAllSubscribers,
    subscribe,
    unsubscribe
}