const { event_subscribers:Events, Devices} = require("../../models");
const {sendEmail} = require("../../services/emailService");

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


const deleteEvent = async (id) => {
    try {
        const event = await Events.findByPk(id);

        if (!event) {
            return { success: false, message: 'Event not found!' };
        }

        event.deletedAt = new Date();
        await event.save();

        if (event.deletedAt) {
            return { success: true, message: 'Event deleted successfully!' };
        }
    } catch (error) {
        throw new Error('Error deleting entry from the database!');
    }
}


const checkForEvents = async (device, measurement) => {
    try {
        const events = await getEventsForDevice(device).then(result => result.data);

        if (!events) {
            console.error('No event subscribers found!')
            return;
        }

        for (const event of events) {
            if (event.options !== null) {
                const options = event.options;
                if (measurement.temperature >= options.goesOver) {
                    await sendEmail(event.email, 'Temperature is over the limit!', `<h1>Temperature is over ${options.goesOver}</h1>`)
                }

                if (measurement.temperature <= options.goesBelow) {
                    await sendEmail(event.email, 'Temperature is under the limit!', `<h1>Temperature is under ${options.goesBelow}!</h1>`)
                }
            }
        }
    } catch (error) {
        throw new Error('Error checking for events!')
    }
}



module.exports = {
    getEventsForDevice,
    createNewEvent,
    deleteEvent,
    checkForEvents
}