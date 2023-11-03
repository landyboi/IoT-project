// RUN THE SCRIPT BY RUNNING: node sendTestEmail.js

const emailService = require('../services/emailService')

async function main() {
    try {
        const result = await emailService.sendEmail('tuomas.mellin@metropolia.fi', 'Test email', '<strong>and this is a test message to the email</strong>');
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

main();