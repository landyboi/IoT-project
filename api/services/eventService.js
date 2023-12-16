const { event_subscribers:Events, Devices} = require("../../models");


const createNewEvent = async (email, ip, device, options) => {
    try {
        const subscriber = await Events.findOne({ where: { email: email, device: device, deletedAt: null } });

        if (subscriber) {
            return {success: false, message: "Subscriber already exists!"}
        }

        const deviceResult = await Devices.findByPk(device);

        if (!deviceResult) {
            return {success: false, message: "Device not found!"}
        }

        ip = "172.168.1.1";

        const result = await Events.create({
            email: email,
            ip_address: ip,
            device: device,
            ...(options && { options: options })
        });

        if (result) {
            return { success: true, data: result };
        }
    } catch (error) {
        throw new Error("Error storing the entry in the database!");
    }
}


const getEventsForDevice = async (device) => {
    try {
        const result = await Events.findAll({ where: { device: device, deletedAt: null } });

        if (result.length === 0) {
            return { success: false, message: "No events found!" }
        }

        return {success: true, data: result}
    } catch (error) {
        throw new Error("Error searching the database!");
    }
}

module.exports = {
    createNewEvent,
    getEventsForDevice
}