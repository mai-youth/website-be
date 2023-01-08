const nodemailer = require('nodemailer')
const { EMAIL_USER, EMAIL_PASS } = require('../constants/env_vairables')

const origin = EMAIL_USER

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: origin,
        pass: EMAIL_PASS,
    }
})

function sendText(to, subject, text, replyTo) {
    const mailOptions = {
        from: origin,
        to,
        subject,
        text,
        replyTo,
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            error ? reject(error) : resolve(info)
        })
    })
}

module.exports = {
    sendText,
    origin,
}
