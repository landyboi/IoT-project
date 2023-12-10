const email = require('@sendgrid/mail')
const path = require('path');


require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
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
        return true;
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

    const temperature = data.temperature;

    const selectEmailTemplate = (temperature) => {
        if (temperature >= 15) {
            return EmailTemplates["+15"];
        } else if (temperature >= 5 && temperature < 15) {
            return EmailTemplates["+5"];
        } else if (temperature <= -5 && temperature > -15) {
            return EmailTemplates["-5"];
        } else if (temperature <= -15) {
            return EmailTemplates["-15"];
        }
    };


    const message = {
        to: to,
        from: 'tuomas.mellin@metropolia.fi',
        subject: subject,
        template_id: selectEmailTemplate(temperature),
        dynamic_template_data:
            {
                "temperature": temperature,
                "humidity": data.humidity,
                "airpressure": data.airpressure,
                "device": data.device,
                "dewpoint": data.dewpoint
            }
    }

    try {
        await email.send(message);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}



const EmailTemplates = {
    "+15": "d-4d04fa370b2340f99a3126ce91c0d776",
    "+5": "d-e19314fce5b14255800865beb83ea33f",
    "-5": "d-b5a32b9b7f8f47e887b16ccede51f6ce",
    "-15": "d-4a1c78e424fe461f8f2613185d78694a"
}



module.exports = { sendEmail, sendTemplateEmail }