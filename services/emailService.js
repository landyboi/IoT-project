const email = require('@sendgrid/mail')
const dotenv = require('dotenv');
const path = require('path');


const envFilePath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envFilePath });
email.setApiKey(process.env.SENDGRID_API_KEY);


async function sendEmail(to, subject, text) {
    if (typeof to !== 'string') {
        throw new Error('Invalid recipient email!')
    }

    if (typeof subject !== 'string') {
        throw new Error('Invalid subject!')
    }

    if (typeof text !== 'string') {
        throw new Error('Invalid message!')
    }

    const message = {
        to: to,
        from: 'tuomas.mellin@metropolia.fi',
        subject: subject,
        html: text
    }

    try {
        await email.send(message);
        return true; // Email sent successfully
    } catch (error) {
        throw new Error(error);
    }
}

async function sendTemplateEmail(to, subject, templateId, data) {
    if (typeof to !== 'string') {
        throw new Error('Invalid recipient email!')
    }

    if (typeof subject !== 'string') {
        throw new Error('Invalid subject!')
    }

    const message = {
        to: to,
        from: 'tuomas.mellin@metropolia.fi',
        subject: subject,
        template_id: templateId,
        dynamic_template_data:
            {
                "%TODAY%": "1.1.1990",
                "first_name": "Tuomas",
                "data": data.temperature
            }
    }

    try {
        await email.send(message);
        return true; // Email sent successfully
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = { sendEmail, sendTemplateEmail }