const express = require('express')
const transporter = require('../utils/email')
const router = express.Router()

router.post('/send', (req, res) => {
    const { email, subject, text } = req.body

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })

    res.end()
})

module.exports = router
