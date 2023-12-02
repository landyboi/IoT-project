const {Devices} = require("../../models");
const uuidCreator = require("uuid");
const { convertCountryToCode } = require("../../services/countryCodeService");

const getDevices = async () => {
    try {
        const devices = await Devices.findAll( { where: { deletedAt: null }});

        if (devices.length === 0) {
            return { success: false, message: 'No devices found!' };
        }

        return { success: true, data: devices };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const initializeDevice = async (name, country) => {
    try {
        const nameCheck = await Devices.findOne({ where: { name: name } } );

        if (nameCheck === null) {
            const countryCode = convertCountryToCode(country);

            if (!countryCode) {
                return {success: false, message: "Country not found or not supported!"};
            }

            const result = await Devices.create({name: name, uuid: uuidCreator.v4(), country: countryCode});

            if (result) {
                return {success: true, data: result};
            }
        } else {
            return {success: false, message: 'Name already in use!'}
        }
    } catch (error) {
        throw new Error('Error storing new device to the database!');
    }
}


const changeDeviceUuid = async (id) => {
    try {
        const device = await Devices.findByPk(id);

        if (!device) {
            return { success: false, message: 'Device not found!' };
        }

        const uuid = uuidCreator.v4();
        device.uuid = uuid;
        await device.save();

        const result = await Devices.findOne({ where: { uuid: uuid } });

        if (result) {
            return { success: true, data: result };
        } else {
            Error('Could not find a device with the new uuid!');
        }
    } catch (error) {
        throw new Error('Error changing the uuid!');
    }
}


const deleteDevice = async (id) => {
    try {
        const device = await Devices.findByPk(id);

        if (!device) {
            return { success: false, message: 'Device not found!' };
        }

        device.deletedAt = new Date();
        await device.save();

        if (device.deletedAt) {
            return { success: true, message: 'Device deleted successfully!' };
        }

    } catch (error) {
        throw new Error('Error deleting device from the database!');
    }
}



module.exports = {
    getDevices,
    initializeDevice,
    changeDeviceUuid,
    deleteDevice
}